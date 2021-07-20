import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TextItem} from '../../shared/interfaces';
import {TextsService} from '../../shared/texts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  arr: any;
  arrBasic: any;
  arrTr: any;
  arrSpeeches: any;

  currentBook: string;
  currentCategory: string;

  constructor(private textsService: TextsService,
              private router: Router) {
    this.arrBasic = {
      1: 'Божественный принцип',
      2: 'Основы философии объединения',
      3: 'Человек планеты, любящий мир',
      4: 'Чхонсонгён',
      5: 'Чхампумогён'
    };

    this.arrTr = {
      1: 'Родовой мессия',
      2: 'Домашняя церковь'
    };

    this.arrSpeeches = {
      1: 'Речи Отца',
      2: 'Сущность завершенного завета',
      3: 'Писания мира',
      4: 'Новая надежда',
      5: 'Путь духовного лидера',
      6: 'Путь объединения',
      7: 'Жизненный путь Истинных Родителей',
      8: 'Сердце Истинной Матери',
      9: 'Основы Божьей провиденциальной истории'
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl('', [Validators.required]),
      book: new FormControl(null, [Validators.required]),
      chapter: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required])
    });
  }

  defineCategory() {
    if (this.form.get('category').value === 'basic') {
      this.arr = this.arrBasic;
    } else if (this.form.get('category').value === 'tribal_messianship') {
      this.arr = this.arrTr;
    } else if (this.form.get('category').value === 'tfs_rus') {
      this.arr = this.arrSpeeches;
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    if (this.form.value.category === 'basic') {
      this.currentCategory = 'Базовые книги';
    } else if (this.form.value.category === 'tribal_messianship') {
      this.currentCategory = 'Родовое мессианство';
    } else if (this.form.value.category === 'tfs_rus') {
      this.currentCategory = 'Сборники речей';
    } else if (this.form.value.category === 'tfs_quotes') {
      this.currentCategory = 'Сборники цитат';
    } else if (this.form.value.category === 'spiritual_world') {
      this.currentCategory = 'О духовном мире';
    } else if (this.form.value.category === 'others') {
      this.currentCategory = 'Прочее';
    } else if (this.form.value.category === 'bible') {
      this.currentCategory = 'Библия';
    }

    if (this.form.value.book === '1') {
      this.currentBook = this.arr[1];
    } else if (this.form.value.book === '2') {
      this.currentBook = this.arr[2];
    } else if (this.form.value.book === '3') {
      this.currentBook = this.arr[3];
    } else if (this.form.value.book === '4') {
      this.currentBook = this.arr[4];
    } else if (this.form.value.book === '5') {
      this.currentBook = this.arr[5];
    } else if (this.form.value.book === '6') {
      this.currentBook = this.arr[6];
    } else if (this.form.value.book === '7') {
      this.currentBook = this.arr[7];
    } else if (this.form.value.book === '8') {
      this.currentBook = this.arr[8];
    } else if (this.form.value.book === '9') {
      this.currentBook = this.arr[9];
    }

    const textItem: TextItem = {
      category: this.currentCategory,
      book: this.currentBook,
      chapter: this.form.value.chapter,
      section: this.form.value.section,
      text: this.form.value.text
    };

    console.log('TextItem', textItem);

    this.textsService.addText(textItem).subscribe(res => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
