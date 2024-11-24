import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

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

  getRandomDogs(dogs: number = 5): Observable<any> {
    return this.httpClient.get(`${this.dogApiUrl}/${dogs}`);
  }

  getRandomRobots(robots: number = 5): string[] {
    const robotImages: string[] = [];
    for (let i = 0; i < robots; i++) {
      const randomNumber = Math.floor(Math.random() * 1000);
      robotImages.push(`${this.robotApiUrl}/${randomNumber}`);
    }
    return robotImages;
  }

  getRandomBooks(books: number = 10): Observable<any> {
    const randomNumbers: number[] = [];
    for (let i = 0; i < books; i++) {
      const randomNumber = Math.floor(Math.random() * 1000);
      randomNumbers.push(randomNumber);
    }
    const randomNumbersStr = randomNumbers.join(',');

    return this.httpClient.get(`${this.bookApiUrl}`, { params: { ids: randomNumbersStr } });
  }

  async saveBooksGenerated(books: Book[]): Promise<any> {
    const batch: firebase.firestore.WriteBatch = this.angularFirestore.firestore.batch();

    try {
      books.forEach((book) => {
        const bookRef = this.angularFirestore.collection('books').doc().ref;
        batch.set(bookRef, book);
      });

      await batch.commit();
    } catch (error) {
      console.log(error);
      return 'Error al guardar el libro';
    }
    return 'Libro/s guardado/s correctamente';
  }
}
