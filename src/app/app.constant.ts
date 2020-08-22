import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class AppConstant {
  public static readonly APP_NAME = `Al-Ma'any PWA`;
  public static readonly API_URL = 'https://almaany.herokuapp.com/';
  public static readonly STORE_FAVORITE = 'favorite';
  public static readonly SUCCESS = 'Berhasil';
  public static readonly FAIL = 'Gagal';
  public static readonly SAVE_ACTION = 'menyimpan terjemahan';
  public static readonly DELETE_ACTION = 'menghapus terjemahan';
  public static readonly ARABIC_REGEX = /[\u0600-\u06FF]/;
  public static readonly LIGHT_MODE = 'light';
  public static readonly DARK_MODE = 'dark';
  public static readonly THEME = 'theme';

  public static readonly SNACKBAR_CLOSE = 'Tutup';
  public static readonly SNACKBAR_DURATION = 1000;
  public static readonly SNACKBAR_HR: MatSnackBarHorizontalPosition = 'start';
  public static readonly SNACKBAR_VR: MatSnackBarVerticalPosition = 'bottom';

  public static readonly dbConfig = {
    name: 'almaany-db',
    version: 1,
    objectStoresMeta: [{
      store: AppConstant.STORE_FAVORITE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'word', keypath: 'word', options: { unique: true } },
        { name: 'translations', keypath: 'word', options: { unique: false } }
      ]
    }]
  };

}
