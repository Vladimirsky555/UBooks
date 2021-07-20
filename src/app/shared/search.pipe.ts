import { Pipe, PipeTransform } from '@angular/core';
import {TextItem} from './interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: TextItem[], search = ''): TextItem[] {
    if (!search.trim()) {
      return items;
    }

    return items.filter(item => {
      return item.text.toLowerCase().includes(search.toLowerCase());
    });
  }
}
