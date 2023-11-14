import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardDescripionValid'
})
export class CardDescripionValidPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 90) {
      return  value.slice(0, 90) + '...';
    }
    return value
  }

}
