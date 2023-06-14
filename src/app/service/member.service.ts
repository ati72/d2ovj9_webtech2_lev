import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../model/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Member[]>('/api/members');
  }

  save(member: Member) {
    return this.http.post<Member>('/api/members', member);
  }

  update(member: Member, id: string) {
    return this.http.put<Member>('/api/members/' + id, member);
  }

  delete(id: string) {
    return this.http.delete<Member>('/api/members/' + id);
  }
}
