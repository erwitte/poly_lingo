import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'lineBreaks'
})
export class LineBreaksPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }
}
