import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface Book {
  id: string;
  title: string;
  authors: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiConsumptionService {
  private dogApiUrl = environment.apis.dog;
  private robotApiUrl = environment.apis.robot;
  private bookApiUrl = environment.apis.book;

  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) {}

  getRandomDog(): Observable<any> {
    return this.httpClient.get(this.dogApiUrl);
  }

  getRandomRobot(): string {
    const randomNumber: number = Math.floor(Math.random() * 100);
    return `${this.robotApiUrl}/${randomNumber}`;
  }

  getRandomBooks(books: number = 10): Observable<any> {
    let randomNumbers: number[] = [];
    for (let i = 0; i < books; i++) {
      const randomNumber = Math.floor(Math.random() * 100);
      randomNumbers.push(randomNumber);
    }
    const randomNumbersStr = randomNumbers.join(',');

    return this.httpClient.get(`${this.bookApiUrl}/?ids=${randomNumbersStr}`);
  }

  async saveBooksGenerated(books: Book[]): Promise<any> {
    try {
      for (let book of books) {
        await this.angularFirestore.collection('books').add(book);
      }
    } catch (error) {
      console.log(error);
      return 'Error al guardar los libros';
    }
    return 'Libros guardados correctamente';
  }
}
