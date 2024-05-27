import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@mon-ecole/annuaire').then(c => c.AnnuaireComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('@mon-ecole/annuaire').then(c => c.EcoleComponent),
  },
];
