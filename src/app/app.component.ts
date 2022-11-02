import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-test';

  /** La definición de la tabla que muestra el listado de conteos. */
  // tableDefinition: DynamicTableDefinition = {
  //   displayedColumns: ["id_conteo", "tipo_Conteo", "id_estado", "plu", "fecha_creacion", "nombre", "acciones"],
  //   headerCellDefinitions: ["ID Conteo", "Tipo", "Estado", "PLU", "Fecha y hora de creacion", "Usuario", ""],
  // }
  
  // /** Componentes custom a usar en el listado de conteos. */
  // customComponents: (Type<any> | null)[] = [null, null, null, null, null, null, CountActionsComponent];
}
