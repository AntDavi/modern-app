import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';

// Define a URL base da API do TheMovieDB.
const BASE_URL = 'https://api.themoviedb.org/3';
// Obtém a chave da API do arquivo de ambiente.
const API_KEY = environment.apiKey;

@Injectable({
  // O serviço será fornecido em toda a aplicação.
  providedIn: 'root'
})
export class MovieService {
  // Injeta o HttpClient para fazer as requisições HTTP.
  private http = inject(HttpClient);
  // Construtor vazio pois o HttpClient é injetado automaticamente.
  constructor() { }

  // Método que busca os filmes mais populares, com suporte à paginação.
  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http
      // Realiza uma requisição GET para obter filmes populares.
      .get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
      // Aplica um atraso de 2 segundos na resposta, útil para simulação de carregamento.
      .pipe(delay(2000));
  }

  // Método que busca os detalhes de um filme específico pelo ID.
  getMovieDetails(id: string): Observable<MovieResult> {
    // Faz uma requisição GET para obter detalhes do filme.
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  }
}
