import { ActivatedRoute } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, NgFor],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
      id: [course.id],
      name: [
        course.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required
      ),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        error: () =>
          this._snackBar.open('Erro ao salvar curso', '', { duration: 5000 }),
        complete: () => {
          this._snackBar.open('Curso Salvo com sucesso', '', {
            duration: 5000,
          });
          this.onCancel();
        },
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  getLessonsArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) return 'Campo Obrigatorio';
    if (field?.hasError('minlength')) {
      console.log(field.errors);
      const requiredCatacteres = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `O campo precisa ter pelo menos ${requiredCatacteres} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredCatacteres = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 80;
      return `O campo precisa ter menos de ${requiredCatacteres} caracteres`;
    }
    return 'Campo invalido';
  }

  onCancel() {
    this.location.back();
  }
}
