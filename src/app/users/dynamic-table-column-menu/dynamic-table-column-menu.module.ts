import { NgModule, Type } from "@angular/core";
import { DynamicTableModule } from "src/app/components-test/dynamic-table/dynamic-table.module";

import { DynamicTableColumnMenuComponent } from "./dynamic-table-column-menu/dynamic-table-column-menu.component";
import { MaterialModule } from '../../material.module';

const components: Type<any> [] = [
    DynamicTableColumnMenuComponent,
];

@NgModule({
    imports: [
        MaterialModule,
        DynamicTableModule,
    ],
    declarations: components,
    exports: components,
})
export class DynamicTableColumnMenuModule {}