import { Routes } from '@angular/router';
import { TranslateComponent } from '../pages/translate/translate.component';
import { FavoriteComponent } from '../pages/favorite/favorite.component';
import { FavoriteDetailComponent } from '../pages/favorite-detail/favorite-detail.component';

export const routes: Routes = [
  { path: '', component: TranslateComponent},
  { path: 'favorite', component: FavoriteComponent},
  { path: 'favorite/:id', component: FavoriteDetailComponent},
];
