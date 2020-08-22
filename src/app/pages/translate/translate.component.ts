import { Component, OnInit, Inject } from '@angular/core';
import { TdLoadingService } from '@covalent/core/loading';
import { Translation } from 'src/app/shared/translation';
import { TranslateService } from 'src/app/services/translate.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Favorite } from 'src/app/shared/favorite';

@Component({
        selector: 'app-translate',
        templateUrl: './translate.component.html',
        styleUrls: ['./translate.component.scss']
    }

) export class TranslateComponent implements OnInit {

    private maxRecentSearches: Number = 3;
    searchTerm: string;
    isSearch: Boolean = false;
    recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches')) || [];
    savedSearches: Favorite[];
    translations: Translation[];
    error: string;
    fromArabic: Boolean;
    orientation: string;

    constructor(
        private _loadingService: TdLoadingService,
        private translateService: TranslateService,
        private dbService: NgxIndexedDBService,
        @Inject('Constants') private Constants,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.initSavedSearches();
    }

    initSavedSearches() {
        this.dbService.getAll(this.Constants.STORE_FAVORITE)
        .then(
            favorites => {
                this.savedSearches = <Favorite[]>favorites.map(fav => {
                    const _fav = <Favorite> fav;
                    return {
                        id: _fav.id,
                        word: _fav.word
                    };
                });
            },
            error => console.log(error)
        );
    }

    handleClick() {
        this.isSearch = true;
    }

    handleFocusOut() {
        this.isSearch = false;
    }

    handleChange(event) {
        const arabic = this.Constants.ARABIC_REGEX;
        if (arabic.test(event)) {
            this.orientation = 'rtl';
            this.fromArabic = true;
        } else {
            this.orientation = 'ltr';
            this.fromArabic = false;
        }
    }

    setSearchTerm(term: string) {
        this.searchTerm = term;
        this.handleSearch();
    }

    handleSearch() {
        this.translations = null;
        this.error = null;
        if (this.searchTerm && this.searchTerm !== '') {
            this.isSearch = false;
            this.saveToRecentSearches(this.searchTerm);
            this._loadingService.register('searchWord');
            this.translateService.getTranslation(this.searchTerm).subscribe(
                translations => {
                    this._loadingService.resolve('searchWord');
                    this.translations = translations;
                },
                error => {
                    this._loadingService.resolve('searchWord');
                    this.error = error;
                }
            );
        }
    }

    saveToRecentSearches(term) {
        const recentSearches = this.recentSearches.reverse();
        if (recentSearches.includes(term)) {
            const termIndex = recentSearches.indexOf(term);
            recentSearches.splice(termIndex, 1);
        }

        if (recentSearches.length >= this.maxRecentSearches) {
            recentSearches.shift();
        }

        recentSearches.push(term);

        localStorage.setItem('recentSearches', JSON.stringify(recentSearches.reverse()));
    }

    async saveSearch() {
        this.dbService.add(this.Constants.STORE_FAVORITE, {
            word: this.searchTerm.toLowerCase(),
            translations: this.translations
        })
        .then(() => {
            this.initSavedSearches();
            this.showMessage(`${this.Constants.SUCCESS} ${this.Constants.SAVE_ACTION}`);
        }, error => {
            console.log(error);
            this.showMessage(`${this.Constants.FAIL} ${this.Constants.SAVE_ACTION}`);
        });
    }

    async deleteSearch() {
        const id = this.getId();
        this.dbService.delete(this.Constants.STORE_FAVORITE, id)
        .then(() => {
            this.initSavedSearches();
            this.showMessage(`${this.Constants.SUCCESS} ${this.Constants.DELETE_ACTION}`);
        }, error => {
            console.log(error);
            this.showMessage(`${this.Constants.FAIL} ${this.Constants.DELETE_ACTION}`);
        });
    }

    getId(): string {
        const savedSearches = this.savedSearches.filter(search => search.word === this.searchTerm.toLowerCase());
        return savedSearches.length === 0 ? null : savedSearches[0].id;
    }

    isSaved(): Boolean {
        return this.getId() !== null;
    }

    showMessage(message: string) {
        this._snackBar.open(message, this.Constants.SNACKBAR_CLOSE, {
            duration: this.Constants.SNACKBAR_DURATION,
            horizontalPosition: this.Constants.SNACKBAR_HR,
            verticalPosition: this.Constants.SNACKBAR_VR
        });
    }

    getIcon() {
        if (this.isSaved()) {
            return 'favorite';
        }
        return 'favorite_outlined';
    }

    handleFab() {
        if (this.isSaved()) {
            this.deleteSearch();
        } else {
            this.saveSearch();
        }
    }

}
