import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from './items/items';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    if (!item.name) {
      return throwError("Name field is required.");
    }

    const { _id, ...newItem } = item;

    return this.http.post<Item>(this.apiUrl, newItem).pipe(
      catchError((error: any) => {
        return throwError("Failed to create item.");
      })
    );
  }

  updateItem(id: string, item: Item): Observable<any> {
    console.log('Updating item with ID:', id, 'and data:', item);
  
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item).pipe(
      catchError((error: any) => {
        console.error('Error updating item:', error);
        return throwError("Failed to update item.");
      })
    );
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
