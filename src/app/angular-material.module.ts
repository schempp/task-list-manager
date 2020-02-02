import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class AngularMaterialModule {}
