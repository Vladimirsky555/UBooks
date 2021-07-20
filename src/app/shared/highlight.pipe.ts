import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  public transform(value: string, predicate: string): string {
    return value.replace(new RegExp(predicate, 'gi'), `<mark>${predicate}</mark>`);
  }

}
