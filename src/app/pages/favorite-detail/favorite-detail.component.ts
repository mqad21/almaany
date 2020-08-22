import { Component, OnInit, Inject } from '@angular/core';
import { Translation } from 'src/app/shared/translation';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.scss']
})
export class FavoriteDetailComponent implements OnInit {

  emptyMessage = 'Belum ada kata favorit yang Anda simpan';
  translations: Translation[];
  word: string;
  id: Number;

  constructor(
    private dbService: NgxIndexedDBService,
    @Inject('Constants') private Constants,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id);
    });
    this.dbService.getByKey(this.Constants.STORE_FAVORITE, this.id)
      .then(
        data => {
          this.translations = <Translation[]>data.translations;
          this.word = data.word;
        },
        error => {
          console.log(error);
          this.router.navigate(['/favorite']);
        }
      );
  }

  isFromArabic() {
    if (!this.translations) return false;
    const arabic = this.Constants.ARABIC_REGEX;
    return arabic.test(this.translations[0].original);
  }

  handleDelete() {
    this.dbService.delete(this.Constants.STORE_FAVORITE, this.id)
      .then(
        () => {
          this.router.navigate(['/favorite', { word: this.word }], { skipLocationChange: true });
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
