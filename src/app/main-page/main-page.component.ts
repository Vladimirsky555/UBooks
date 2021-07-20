import { Component, OnInit } from '@angular/core';
import {TextItem} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {TextsService} from '../shared/texts.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  items$: Observable<TextItem[]>;
  form: FormGroup;

  arr: any;
  arrBasic: any;
  arrTr: any;
  arrSpeeches: any;
  arrQuotes: any;
  arrSW: any;
  arrOthers: any;

  currentBook: string;
  currentCategory: string;
  searchStr = '';

  constructor(public textsService: TextsService) {
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

    this.arrQuotes = {
      1: 'Благословение и идеальная семья',
      2: 'Путь Божьей воли',
      3: 'Воспитание детей в Божьей воле',
      4: 'Философия воспитания',
      5: 'Философия мира',
      6: 'Истинная семья - врата ведущие на небеса',
      7: 'Истинные Родители',
      8: 'Путь традиции',
      9: 'Путь истинного ребёнка',
      10: 'Идеал творения и любовь между мужчиной и женщиной'
    };

    this.arrSW = {
      1: 'Жизнь на земле и духовный мир',
      2: 'Жизнь в духовном мире и на земле',
      3: 'Истинные Родителил - спасители небес и земли',
      4: 'Послания из духовного мира',
      5: 'В поисках истинного я',
      6: 'Люцифер - преступление против человечества'
    };

    this.arrOthers = {
      1: 'Традиции Церкви Объединения',
      2: 'Всемирное писание. Сравнительная антология священных текстов',
      3: 'Путь первопроходца',
      4: 'Кто Он? Мессия. Чондорён. Майтрейя Будда.'
    };
  }

  ngOnInit() {
    this.items$ = this.textsService.getAll();
    this.form = new FormGroup({
      category: new FormControl(null, [Validators.required]),
      book: new FormControl(null, [Validators.required])
    });
  }

  defineCategory() {
    if (this.form.get('category').value === 'basic') {
      this.arr = this.arrBasic;
    } else if (this.form.get('category').value === 'tribal_messianship') {
      this.arr = this.arrTr;
    } else if (this.form.get('category').value === 'tfs_rus') {
      this.arr = this.arrSpeeches;
    } else if (this.form.get('category').value === 'tfs_quotes') {
      this.arr = this.arrQuotes;
    } else if (this.form.get('category').value === 'spiritual_world') {
      this.arr = this.arrSW;
    } else if (this.form.get('category').value === 'others') {
      this.arr = this.arrOthers;
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

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

    this.textsService.setBook(this.currentBook);
  }

  setSearchStr(searchStr: string) {
    this.textsService.setSearchStr(searchStr);
  }
}
