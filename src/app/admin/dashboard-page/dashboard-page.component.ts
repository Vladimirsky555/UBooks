import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextItem} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {TextsService} from '../../shared/texts.service';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy {

  textItems: TextItem[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';

  constructor(private textsService: TextsService,
              public auth: AuthService) { }

  ngOnInit() {
    this.pSub = this.textsService.getAll().subscribe(textItems => {
      this.textItems = textItems;
    });
  }

  remove(id: string) {
    this.dSub = this.textsService.remove(id).subscribe(() => {
      this.textItems = this.textItems.filter(item => item.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
