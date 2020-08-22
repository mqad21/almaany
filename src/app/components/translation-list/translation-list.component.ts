import { Component, OnInit, Input } from '@angular/core';
import { Translation } from 'src/app/shared/translation';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent implements OnInit {

  constructor() { }

  @Input() translations: Translation[];
  @Input() fromArabic: boolean;

  ngOnInit() {
  }

}
