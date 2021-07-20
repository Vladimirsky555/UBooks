import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FbResponce, TextItem} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  book = '';
  searchStr = 'Бог';

  constructor(private http: HttpClient) { }

  addText(textItem: TextItem) {
    return this.http.post(`${environment.fbDbUrl}/texts.json`, textItem)
      .pipe(map((res: FbResponce) => {
        return {
          ...textItem,
          id: res.name
        };
      }));
  }

  getById(id: string): Observable<TextItem> {
    return this.http.get<TextItem>(`${environment.fbDbUrl}/texts/${id}.json`)
      .pipe(map((res: TextItem) => {
        return {
          ...res, id
        };
      }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/texts/${id}.json`);
  }

  update(text: TextItem): Observable<TextItem> {
    return this.http.patch<TextItem>(`${environment.fbDbUrl}/texts/${text.id}.json`, text);
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/texts.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key
          }));
      }));
  }

  setBook(book: string) {
    this.book = book;
  }

  // Устанавливаем поисковое слово в сервисе
  setSearchStr(text: string) {
    if (text !== '') {
      this.searchStr = text;
    } else {
      this.searchStr = 'Божественный принцип';
    }
  }

  getSearchStr(): string {
    return this.searchStr;
  }
}
