import { Component, OnInit } from '@angular/core';
import {TextItem} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {TextsService} from '../shared/texts.service';


@Component({
  selector: 'app-items-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  item$: Observable<TextItem>;
  searchStr = '';

  constructor(private route: ActivatedRoute,
              private textsService: TextsService) {
    this.searchStr = this.textsService.getSearchStr();
  }

  ngOnInit(): void {
    this.item$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.textsService.getById(params.id);
      }));
  }
}
