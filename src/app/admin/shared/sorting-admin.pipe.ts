import {Pipe, PipeTransform} from '@angular/core';
import {TextItem} from '../../shared/interfaces';

@Pipe({
  name: 'sortingadmin'
})

export class SortingAdminPipe implements PipeTransform {
  transform(items: TextItem[], book = ''): any {
    if (!book.trim()) {
      return items;
    }

    return items.filter(item => {
      return item.book.toLowerCase().includes(book.toLowerCase());
    });
  }
}
