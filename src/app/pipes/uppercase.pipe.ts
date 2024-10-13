import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customUppercase',
  standalone: true 
})
export class UppercasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.toUpperCase();
  }

}
