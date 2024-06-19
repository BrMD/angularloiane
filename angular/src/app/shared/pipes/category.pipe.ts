import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true,
})
export class CategoryPipe implements PipeTransform {
  transform(value: unknown): unknown {
    switch (value) {
      case 'Frontend':
        return 'code';
      case 'Backend':
        return 'computer';
      case 'seila':
        return 'code';
    }
    return null;
  }
}
