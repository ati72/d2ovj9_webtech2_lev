import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Book[]>('/api/books');
  }

  save(book: Book) {
    return this.http.post<Book>('/api/books', book);
  }

  update(book: Book, id: string) {
    return this.http.put<Book>('/api/books/' + id, book);
  }

  delete(id: string) {
    return this.http.delete<Book>('/api/books/' + id);
  }
}
