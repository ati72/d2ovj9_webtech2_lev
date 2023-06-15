import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/service/book.service';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['author', 'title', 'released', 'action'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  openDialog() {
    this.dialog
      .open(BookDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllBooks();
        }
      });
  }

  getAllBooks() {
    this.bookService.getAll().subscribe({
      next: (book) => {
        this.dataSource = new MatTableDataSource(book);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  deleteItem(id: string) {
    this.bookService.delete(id).subscribe({
      next: (res) => {
        this.snackBar.open('Book deleted', '', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.getAllBooks();
      },
      error: (err) => alert('Error while deleting item'),
    });
  }

  editBook(row: any) {
    this.dialog
      .open(BookDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllBooks();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
