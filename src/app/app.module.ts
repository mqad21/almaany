import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DrawerComponent } from './components/drawer/drawer.component';
import { AppConstant } from './app.constant';
import { TranslateComponent } from './pages/translate/translate.component';

import { ClickOutsideModule } from 'ng-click-outside';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { FavoriteDetailComponent } from './pages/favorite-detail/favorite-detail.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawerComponent,
    TranslateComponent,
    FavoriteComponent,
    FavoriteDetailComponent,
    TranslationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ClickOutsideModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(AppConstant.dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: 'Constants', useValue: AppConstant }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
