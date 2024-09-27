import { MovieService } from './../services/movie.service';
import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonLabel, IonIcon, IonItem, IonCardContent, IonText, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule
  ]
})
export class DetailsPage {
  private movieService = inject(MovieService);  // Injeta o MovieService para obter os detalhes do filme.
  public imageBaseUrl = 'https://image.tmdb.org/t/p/';  // URL base para imagens dos filmes.
  public movie: WritableSignal<MovieResult | null> = signal(null);  // Utiliza WritableSignal para armazenar e reagir à mudança dos dados do filme.

  // Propriedade de entrada (@Input) que recebe o ID do filme a ser exibido.
  @Input()
  set id(movieId: string) {
    // Ao definir o ID do filme, faz uma requisição ao serviço para buscar os detalhes e atualiza o sinal "movie".
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie);  // Atualiza o estado do filme com os detalhes recebidos da API.
    });
  }

  constructor() {
    // Adiciona ícones customizados ao aplicativo.
    addIcons({cashOutline, calendarOutline});
  }
}
