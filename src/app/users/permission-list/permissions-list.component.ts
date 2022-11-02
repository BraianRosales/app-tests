import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, map, Observable } from 'rxjs';
import { CheckBoolComponent } from '../permissions/components/check-bool/check-bool.component';
import { DialogEditPermissionsComponent } from '../permissions/components/dialog-edit-permissions/dialog-edit-permissions.component';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Permission, PermissionPayload } from '../index-user';
import { CustomCellComponent, DynamicComponent, DynamicTableColumnMenuData, DynamicTableColumnMenuOption, DynamicTableDefinition } from 'src/app/interfaces/index-table';
import { DynamicTableColumnMenuComponent } from '../dynamic-table-column-menu/dynamic-table-column-menu/dynamic-table-column-menu.component';
import { DynamicSearchResult } from 'src/app/interfaces';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
    selector: 'app-permissions-list',
    templateUrl: './permissions-list.component.html',
    styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent implements OnInit {

    /** Flag que indica si se debe habilitar la opción de ordenamiento de la `DynamicTableComponent` en el listado de permisos. */
    @Input()
    useSorting: boolean = false;

    /** Flag que indica si se debe habilitar la opción de filtrado de la `DynamicTableComponent` en el listado de permisos. */
    @Input()
    useFilters: boolean = false;

    /** Flag que indica si se debe habilitar la opción de selección múltiple de la `DynamicTableComponent` en el listado de permisos. */
    @Input()
    useSelection: boolean = false;

    /** Flag que indica si se debe habilitar la opción de "seleccionar todos" para la funcionalidad de selección múltiple de la `DynamicTableComponent` en el listado de permisos. */
    @Input()
    allowSelectAll: boolean = true;

    /** La definición de la tabla que muestra el listado de permisos. */
    @Input()
    tableDefinition: DynamicTableDefinition = {
        displayedColumns: ["id_permiso", "permiso", "descripcion", "fecha_creacion", "activo","acciones"],
        headerCellDefinitions: ["Numero", "Permiso", "Descripción", "Creado", "Habilitado","Acciones"],
    }

    /** Flag que indica si deben ocultarse los permisos que estén deshabilitados. Por default es `false`. */
    @Input()
    hideDisabled: boolean = false;

    /** Margen de la barra de búsqueda. */
    @Input()
    searchBarMargin: string = "";

    /** Texto de la alerta */
    @Input() templateText: string = 'No se encontraron permisos para la búsqueda ingresada'

     /** Variable donde se guardan los permisos de forma dinamica */
    @Input() permission$: Observable<Permission[]> = this.permissionsService.getPermissions()

     /** Icono dinamico */
    @Input() icon : string = 'search'

     /** Flag que indica si se está cargando la lista de permisos. */
    @Input() loading: boolean = false;

    /** Listado de índices de los permisos seleccionados por defecto. */
    @Input()
    defaultSelectedRowIndexes: number[] = [];

    /**
     * Evento disparado cuando se selecciona una fila en caso de que `useSelection` esté habilitado.
     * 
     * Encapsula al `selectionEvent` de la `DynamicTableComponent`.
     */
    @Output()
    selectionEvent: EventEmitter<Permission[]> = new EventEmitter<Permission[]>();

    tableUpdateSource: Subject<boolean> = new Subject<boolean>();

    /** Flag que indica si se produjo un error al consultar el listado de permisos. */
    error: boolean = false;

    /** Propiedades en las cuales realizar la búsqueda ingresada por el usuario. */
    filterProperties: (keyof Permission)[] = ["descripcion", "permiso"];

    /** 
     * Listado de permisos filtrados actualmente.
     * 
     * Por default son todos los permisos.
     */
    filteredPermissions: Permission[] = [];

    /** Variable donde se guardan todos los permissions traidos desde `PermissionsService`. */
    permissions: Permission[] = [];

    /** Permisos de pasar hacia el componente padre / ejemplo un dialog */
    @Output()
    totalPermissions: EventEmitter<Permission[]> = new EventEmitter<Permission[]>();
    
    @Input() cantRow: number = 9

    /** Componentes custom a usar en el listado de permisos. */
    customComponents: (Type<CustomCellComponent> | DynamicComponent | null)[] = [
        null, null, null, null, CheckBoolComponent, {
            type: DynamicTableColumnMenuComponent,
            componentData: <DynamicTableColumnMenuData> {
                options: <DynamicTableColumnMenuOption<Permission>[]>[
                    {
                        icon: "edit",
                        description: "Editar",
                        optionFn: (permission: Permission) => {
                            this.dialog.open(DialogEditPermissionsComponent, {
                                width: '500px',
                                data: {
                                    id_permiso: permission.id_permiso,
                                    activo: permission.activo,
                                    fecha_creacion: permission.fecha_creacion,
                                    permiso: permission.permiso,
                                    descripcion: permission.descripcion,
                                },
                            });
                        }
                    },
                    {
                        icon: (permission: Permission) => {
                            return permission.activo ? "block" : "check_circle";
                        },
                        description: (permission: Permission) => {
                            return permission.activo ? "Deshabilitar" : "Habilitar";
                        },
                        optionFn: (permission: Permission) => {
                            this.changeOfEnabled(permission)
                        }
                    },
                ],
            }
        }
    ];

    constructor (
        private permissionsService: PermissionsService,
        private dialog: MatDialog,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {
        this.loadPermissions();
        this.permissionsService.refresh$.subscribe(() => {
            this.loadPermissions();
        });
    }
    
    /**
     * Switch cambio el enabled entre 1 y 0.
     */
    changeOfEnabled(permission: Permission): void {
        const permissionEdited: PermissionPayload = {
            id_permiso: permission.id_permiso,
            permiso: permission.permiso,
            descripcion: permission.descripcion,
            enabled: Math.abs(permission.activo - 1),
        }
        this.permissionsService.permissionModification(permissionEdited).subscribe();
        if (permission.activo) {
            this.snackBarService.open(`Permiso número ${permission.id_permiso} deshabilitado`, "Aceptar", 7500, "warning-snackbar");
        } else {
            this.snackBarService.open(`Permiso número ${permission.id_permiso} habilitado`, "Aceptar", 7500, "warning-snackbar");
        }
    }

    /**
     * Carga el listado de permisos completo.
     */
    loadPermissions(): void {
        this.error = false;
        this.loading = true;
        this.permission$.pipe(
            map((permissions: Permission[]) => this.hideDisabled ? permissions.filter((permission: Permission) => permission.activo == 1) : permissions),
        ).subscribe({
            next: (permissions: Permission[]) => {
                this.permissions = permissions;
                this.filteredPermissions = permissions;
                this.error = false;
                this.loading = false;
                setTimeout(() => {
                    this.tableUpdateSource.next(true);
                }, 100);
                this.totalPermissions.emit(this.filteredPermissions);
            },
            error: (error: HttpErrorResponse) => {
                this.permissions = [];
                this.filteredPermissions = [];
                this.error = true;
                this.loading = false;
            },
        });
        this.filteredPermissions.length === 0
            ? (setTimeout(() => {
                    this.loading = false;
                }, 1000))
            : (this.loading = true);
    }

    /**
     * Handler para evento de resultado de búsqueda de permisos.
     * 
     * Se encarga de actualizar la lista de permisos con el resultado de la búsqueda.
     * 
     * @param $event el evento de búsqueda
     */
    onSearchResult($event: DynamicSearchResult<Permission>): void {
        this.filteredPermissions = $event.searchResult;

        setTimeout(() => {
            this.tableUpdateSource.next(true);
        }, 100);
    }
}
