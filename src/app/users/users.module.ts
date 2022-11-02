import { NgModule } from '@angular/core';

import { PermissionsComponent } from './permissions/permissions.component';

import { CheckBoolComponent } from './permissions/components/check-bool/check-bool.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { PermissionsService } from '../services/permissions.service';


import { DialogCreateComponent } from './permissions/components/dialog-create/dialog-create.component';
import { MaterialModule } from '../material.module';

import { DynamicTableModule } from '../components-test/dynamic-table/dynamic-table.module';
import { DynamicTableColumnMenuModule } from './dynamic-table-column-menu/dynamic-table-column-menu.module';
import { DialogEditPermissionsComponent } from './permissions/components/dialog-edit-permissions/dialog-edit-permissions.component';
import { PermissionsListComponent } from './permission-list/permissions-list.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    PermissionsComponent,
    CheckBoolComponent,
    DialogCreateComponent,
    PermissionsListComponent,
    DialogEditPermissionsComponent
  ],
  imports: [
    MaterialModule,
    DynamicTableModule,
    ReactiveFormsModule,
    DynamicTableColumnMenuModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PermissionsService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  exports : [
    PermissionsComponent
  ]
})
export class UsersModule { }
