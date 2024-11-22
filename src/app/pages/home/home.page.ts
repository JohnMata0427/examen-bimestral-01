import { Component } from '@angular/core';
import { ApiConsumptionService } from 'src/app/services/api-consumption.service';
import { type Book } from 'src/app/services/api-consumption.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public images: string[] = [];
  public loading: boolean = false;
  public books: Book[] = [];
  public openAlert: boolean = false;
  public message: string = '';

  constructor(private apiConsumptionService: ApiConsumptionService) {}

  ngOnInit() {
    this.loading = true;
    this.getFiveRandomDogs();
    this.getFiveRandomRobots();
    this.apiConsumptionService.getRandomBooks().subscribe({
      next: ({ results }: { results: any[] }) => {
        this.books = results.map((book: any, index: number) => {
          return {
            id: book.id,
            title: book.title,
            authors: book?.authors[0]?.name || 'Desconocido',
            thumbnail: this.images[index],
          };
        });

        console.log(this.books);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getFiveRandomDogs() {
    for (let i = 0; i < 5; i++) {
      this.apiConsumptionService.getRandomDog().subscribe({
        next: ({ message }: { message: string }) => {
          this.images.push(message);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  getFiveRandomRobots() {
    for (let i = 0; i < 5; i++) {
      const robotUrl = this.apiConsumptionService.getRandomRobot();
      this.images.push(robotUrl);
    }
  }
  
  reloadPage() {
    window.location.reload();
  }

  async saveBooks() {
    const result = await this.apiConsumptionService.saveBooksGenerated(this.books);
    this.setOpenAlert(true);
    this.message = result;
  }

  setOpenAlert(openAlert: boolean) {
    this.openAlert = openAlert;
  }
}
