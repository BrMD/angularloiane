import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(80)],
    ],
    category: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      error: () =>
        this._snackBar.open('Erro ao salvar curso', '', { duration: 5000 }),
      complete: () => {
        this._snackBar.open('Curso Salvo com sucesso', '', { duration: 5000 });
        this.onCancel();
      },
    });
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
