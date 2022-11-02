import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports : [
    DynamicTableComponent
  ]
})
export class DynamicTableModule { }
