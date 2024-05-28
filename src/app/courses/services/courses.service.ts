import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API =
    'https://my-json-server.typicode.com/BrMD/angularloiane/courses';
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Course[]>(this.API);
  }
}
