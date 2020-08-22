import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';

import { CovalentSearchModule } from '@covalent/core/search';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { TdLoadingComponent } from '@covalent/core/loading';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatSnackBarModule,
  MatRippleModule,
  CovalentSearchModule,
  CovalentLoadingModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...material
  ],
  exports: [
    ...material
  ],
  entryComponents: [
    TdLoadingComponent
  ],
  declarations: []
})
export class MaterialModule { }
