import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent, IonInfiniteScroll, IonBadge, IonLabel, IonAlert, IonSkeletonText, IonAvatar, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, DatePipe, RouterModule 
  ],
})
export class HomePage {
  private movieService = new MovieService();  // Instancia o MovieService para acessar a API de filmes.
  private currentPage = 1;  // Controla a página atual dos resultados.
  public error = null;  // Armazena possíveis mensagens de erro da API.
  public isLoading = false;  // Controla o estado de carregamento da tela.
  public movies: MovieResult[] = [];  // Armazena a lista de filmes carregados.
  public imageBaseUrl = 'https://image.tmdb.org/t/p/';  // URL base para exibir as imagens dos filmes.
  public dummyArray = new Array(5);  // Array usado para exibir elementos de carregamento placeholders (skeleton).

  constructor() {
    this.loadMovies();  // Carrega os filmes ao inicializar o componente.
  }

  // Método que carrega os filmes, podendo ser disparado por um evento de rolagem infinita.
  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;  // Reseta o erro ao iniciar uma nova requisição.

    if (!event) {
      this.isLoading = true;  // Exibe o loader enquanto os filmes são carregados.
    }

    this.movieService
      .getTopRatedMovies(this.currentPage)  // Chama o serviço para obter filmes populares, passando a página atual.
      .pipe(
        finalize(() => {
          this.isLoading = false;  // Desativa o loader ao finalizar a requisição.
          if (event) {
            event.target.complete();  // Finaliza o evento de rolagem infinita.
          }
        }),
        catchError((err: any) => {  // Captura e trata erros da requisição.
          console.log(err);
          this.error = err.error.status_message;  // Armazena a mensagem de erro.
          return [];  // Retorna um array vazio no caso de erro.
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.movies.push(...res.results);  // Adiciona os resultados da API à lista de filmes.

          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;  // Desabilita o scroll infinito se todos os resultados tiverem sido carregados.
          }
        }
      });
  }

  // Método que carrega mais filmes quando o usuário chega ao fim da lista.
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;  // Incrementa o número da página.
    this.loadMovies(event);  // Carrega a próxima página de filmes.
  }
}