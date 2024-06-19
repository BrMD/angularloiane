import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/coursePage';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule, NgIf, CommonModule, CoursesListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<CoursePage> | null = null;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  pageIndex = 0;
  pageSize = 10;
  constructor(
    public coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.onCall();
  }

  onCall(pageEvent:PageEvent = {length: 0, pageIndex:0, pageSize: 10}) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() => {this.pageIndex = pageEvent.pageIndex;this.pageSize = pageEvent.pageSize}),
      catchError(() => {
        this.onError('Erro ao Carregar cursos');
        return of({courses:[], totalElements:0, totalPages:0});
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit/', course.id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course.id).subscribe({
          error: () => this.onError('Erro ao tentar remover Curso'),
          complete: () => {
            this.snackbar.open('Curso deletado com sucesso', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            this.onCall();
          },
        });
      }
    });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
  displayedColumns = ['name', 'category', 'actions'];
}
