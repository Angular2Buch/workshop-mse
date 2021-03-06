import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Book } from '../shared/book';

@Injectable()
export class BooksService {

  api: string;
  jsonHeader: Headers;

  constructor(private http: Http) {
    this.api = 'https://book-monkey2-api.angular-buch.com';

    this.jsonHeader = new Headers();
    this.jsonHeader.append('Content-Type', 'application/json');
  }

  getAll(): Observable<Book[]> {
    return this.http.get(`${this.api}/books`)
               .map(response => response.json()) // JSON Bücher
               .map(rawBooks => rawBooks.map(r => new Book(r.title, r.description, r.rating, r.isbn)));
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get(`${this.api}/book/${isbn}`)
               .map(response => response.json()) // JSON Bücher
               .map(rawBook => new Book(rawBook.title,
                                        rawBook.description,
                                        rawBook.rating,
                                        rawBook.isbn));
  }

  create(book: Book) {
    return this.http.post(`${this.api}/book`,
                          JSON.stringify(book),
                          { headers: this.jsonHeader });
  }

  update(book: Book) {
    return this.http.put(`${this.api}/book/${book.isbn}`,
                         JSON.stringify(book),
                         { headers: this.jsonHeader });
  }

  delete(book: Book) {
    return this.http.delete(`${this.api}/book/${book.isbn}`);
  }
}
