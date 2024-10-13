import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kgToGrams',
  standalone: true
})
export class KgToGramsPipe implements PipeTransform {

  transform(value: number): string {
    return value * 1000 + 'g';
  }

}
