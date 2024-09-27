import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Define a rota para a página inicial, carregando o componente de forma assíncrona.
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // Redireciona o caminho vazio ('') para a página 'home-defer'.
    path: '',
    redirectTo: 'home-defer',
    pathMatch: 'full',
  },
  {
    // Define a rota para os detalhes de um filme, utilizando o ID passado como parâmetro na URL.
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then(m => m.DetailsPage)
  },
  {
    // Define uma rota alternativa para 'home-defer', carregando o componente de forma assíncrona.
    path: 'home-defer',
    loadComponent: () => import('./home-defer/home-defer.page').then(m => m.HomeDeferPage)
  },
];
