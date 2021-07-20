import {Component, Input, OnInit} from '@angular/core';
import {TextItem} from '../interfaces';
import {TextsService} from '../texts.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: TextItem;
  constructor() { }
  ngOnInit() {}
}
