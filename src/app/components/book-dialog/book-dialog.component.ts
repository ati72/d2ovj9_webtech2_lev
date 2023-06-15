import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css'],
})
export class BookDialogComponent implements OnInit {
  bookForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<BookDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      _id: [],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      title: ['', [Validators.required]],
      released: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.bookForm.controls['_id'].setValue(this.editData._id);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['title'].setValue(this.editData.title);
      this.bookForm.controls['released'].setValue(this.editData.released);
    }
  }

  addBook() {
    if (!this.editData) {
      if (this.bookForm.valid) {
        this.bookService.save(this.bookForm.value as Book).subscribe({
          next: (res) => {
            this.snackBar.open('Book added.', '', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.bookForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            console.log(err);
            console.log(this.bookForm.value);
            alert('Error while saving book.');
          },
        });
      } else {
        this.bookForm.markAllAsTouched();
      }
    } else {
      if (this.bookForm.valid) {
        this.updateBook();
      }
    }
  }

  updateBook() {
    this.bookService.update(this.bookForm.value, this.editData._id).subscribe({
      next: (res) => {
        this.snackBar.open('Book updated.', '', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
        this.bookForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        console.log(err);
        alert('Error while updating book.');
      },
    });
  }
}
