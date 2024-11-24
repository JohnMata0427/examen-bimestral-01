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
  public openAlert: boolean = false;
  public message: string = '';
  public loading!: boolean;
  public books!: Book[];

  constructor(private apiConsumptionService: ApiConsumptionService) {}

  ngOnInit(): void {
    this.getNewBooks();
  }

  getDogImages(): void {
    this.apiConsumptionService.getRandomDogs().subscribe({
      next: ({ message }: { message: string[] }) => {
        this.images = [...this.images, ...message];
      },
    });
  }

  getRobotImages(): void {
    const robotImages = this.apiConsumptionService.getRandomRobots();
    this.images = [...this.images, ...robotImages];
  }

  getBooks(): void {
    this.apiConsumptionService.getRandomBooks(15).subscribe({
      next: ({ results }: { results: any[] }) => {
        this.books = results.map((book: any, index: number) => {
          return {
            id: book.id,
            title: book.title,
            authors: book?.authors[0]?.name || 'Desconocido',
            thumbnail: this.images[index],
          };
        });
        this.books = this.books.slice(0, 10);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getNewBooks(): void {
    this.loading = true;
    this.images = [];
    this.getRobotImages();
    this.getDogImages();
    this.getBooks();
  }

  async saveBooks(books: Book[]): Promise<void> {
    const result = await this.apiConsumptionService.saveBooksGenerated(books);
    this.openAlert = true;
    this.message = result;
  }
}
