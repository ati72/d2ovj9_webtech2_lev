import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/model/Member';
import { MemberService } from 'src/app/service/member.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'idCardNumber',
    'address',
    'action',
  ];
  dataSource!: MatTableDataSource<Member>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllMembers();
  }

  openDialog() {
    this.dialog
      .open(MemberDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllMembers();
        }
      });
  }

  getAllMembers() {
    this.memberService.getAll().subscribe({
      next: (member) => {
        this.dataSource = new MatTableDataSource(member);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.log(err),
    });
  }

  deleteMember(id: string) {
    this.memberService.delete(id).subscribe({
      next: (res) => {
        this.getAllMembers();
      },
      error: (err) => alert('Error while deleting member'),
    });
  }

  editMember(row: any) {
    this.dialog
      .open(MemberDialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllMembers();
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
