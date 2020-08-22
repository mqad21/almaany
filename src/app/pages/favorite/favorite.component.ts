import { Component, OnInit, Inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SavedTranslations } from 'src/app/shared/savedTranslations';
import { Translation } from 'src/app/shared/translation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  _savedTranslations: SavedTranslations[];
  error = 'Belum ada terjemahan yang Anda simpan';
  word: string;

  constructor(
    private dbService: NgxIndexedDBService,
    @Inject('Constants') private Constants,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dbService.getAll(this.Constants.STORE_FAVORITE).then(
      data => {
        this._savedTranslations = <SavedTranslations[]> data;
        console.log(data);
      },
      error => {
        this._savedTranslations = [];
        console.log(error);
      }
    );
    this.word = this.route.snapshot.paramMap.get('word');
    if (this.word) {
      this.showMessage(`${this.Constants.SUCCESS} ${this.Constants.DELETE_ACTION} : ${this.word}`);
      this.word = null;
    }
  }

  get savedTranslations(): SavedTranslations[] {
    return this._savedTranslations.reverse();
  }

  showMessage(message: string) {
    this._snackBar.open(message, this.Constants.SNACKBAR_CLOSE, {
        duration: this.Constants.SNACKBAR_DURATION,
        horizontalPosition: this.Constants.SNACKBAR_HR,
        verticalPosition: this.Constants.SNACKBAR_VR
    });
  }

  isError() {
    return this._savedTranslations.length === 0;
  }


}
