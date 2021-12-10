import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL_COMPONENT = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
];

@NgModule({
  imports: [ CommonModule, ...MATERIAL_COMPONENT ],
  exports: [ ...MATERIAL_COMPONENT ],
})
export class MaterialUiModule { }
