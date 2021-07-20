import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TextItem} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TextsService} from '../../shared/texts.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})

export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  textItem: TextItem;
  submitted = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private textsService: TextsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.textsService.getById(params.id);
      })
    ).subscribe((item: TextItem) => {
      this.textItem = item;
      this.form = new FormGroup({
        category: new FormControl(this.textItem.category, [Validators.required]),
        book: new FormControl(this.textItem.book, [Validators.required]),
        chapter: new FormControl(this.textItem.chapter, [Validators.required]),
        section: new FormControl(this.textItem.section, [Validators.required]),
        text: new FormControl(this.textItem.text, [Validators.required])
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.uSub = this.textsService.update({
      ...this.textItem,
      category: this.form.value.category,
      book: this.form.value.book,
      chapter: this.form.value.chapter,
      section: this.form.value.section,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
