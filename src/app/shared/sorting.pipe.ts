import {Pipe, PipeTransform} from '@angular/core';
import {TextItem} from './interfaces';

@Pipe({
  name: 'sorting'
})

export class SortingPipe implements PipeTransform {

  transform(textItems: TextItem[], book = ''): any {
    return textItems.filter(item => {
      return item.book === book;
    });
  }
}
