import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses: Observable<Course[]>;
  dataSource;
  constructor(public coursesService: CoursesService) {
    this.courses = this.coursesService.list();
    this.dataSource = this.courses;
  }
  displayedColumns = ['name', 'category'];
}
