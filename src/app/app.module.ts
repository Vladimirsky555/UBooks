import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AuthInterceptor} from './shared/auth.interceptor';

import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import {QuillModule} from 'ngx-quill';
import { ItemComponent } from './shared/item/item.component';
import { ItemPageComponent } from './item-page/item-page.component';
import {SortingPipe} from './shared/sorting.pipe';
import { SearchPipe } from './shared/search.pipe';
import { HighlightPipe } from './shared/highlight.pipe';
import { HighlightDirective } from './shared/highlight.directive';
import { SearchComponent } from './search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ItemComponent,
    ItemPageComponent,
    SortingPipe,
    SearchPipe,
    HighlightPipe,
    HighlightDirective,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
