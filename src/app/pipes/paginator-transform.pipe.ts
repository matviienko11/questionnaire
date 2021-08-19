import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
  {
    name: 'paginator'
  }
)
export class PaginatorTransformPipe implements PipeTransform {
  transform(value: string | number): any {
    if(typeof value === 'number') {
      return value + 1;
    } else {
      return value;
    }
  }
}
