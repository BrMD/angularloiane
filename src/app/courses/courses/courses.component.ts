import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  // courses: Observable<Course[]>;
  dataSource: Course[];
  constructor(public coursesService: CoursesService) {
    this.dataSource = [];
    this.coursesService.list().subscribe((data) => console.log(data));
  }
  displayedColumns = ['name', 'category'];
}
