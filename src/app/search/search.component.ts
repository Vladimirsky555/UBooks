import { Component, OnInit } from '@angular/core';
import {TextsService} from '../shared/texts.service';
import {Observable} from 'rxjs';
import {TextItem} from '../shared/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  items$: Observable<TextItem[]>;
  searchStr = '';

  constructor(public textsService: TextsService) { }

  ngOnInit() {
    this.items$ = this.textsService.getAll();
  }

  setSearchStr(searchStr: string) {
    this.textsService.setSearchStr(searchStr);
  }
}
