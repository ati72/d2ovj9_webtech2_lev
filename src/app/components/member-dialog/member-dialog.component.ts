import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Member } from 'src/app/model/Member';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css'],
})
export class MemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
  actionButton: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      _id: [],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      idCardNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: ['', [Validators.required]],
    });
    if (this.editData) {
      this.actionButton = 'Update';
      this.memberForm.controls['_id'].setValue(this.editData._id);
      this.memberForm.controls['firstName'].setValue(this.editData.firstName);
      this.memberForm.controls['lastName'].setValue(this.editData.lastName);
      this.memberForm.controls['idCardNumber'].setValue(
        this.editData.idCardNumber
      );
      this.memberForm.controls['address'].setValue(this.editData.address);
    }
  }

  addMember() {
    if (!this.editData) {
      if (this.memberForm.valid) {
        this.memberService.save(this.memberForm.value as Member).subscribe({
          next: (res) => {
            this.snackBar.open('Member added.', '', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
            this.memberForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            console.log(err);
            alert('Error while saving member.');
          },
        });
      } else {
        this.memberForm.markAllAsTouched();
      }
    } else {
      if (this.memberForm.valid) {
        this.updateMember();
      }
    }
  }

  updateMember() {
    this.memberService
      .update(this.memberForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Member updated.', '', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.memberForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          console.log(err);
          alert('Error while updating member');
        },
      });
  }
}
