import { Injectable } from '@angular/core';
import { delay, Observable, of, Subject} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Permission, PermissionPayload } from '../users/index-user';
import { Enabled } from '../users/model';


@Injectable({
    providedIn: 'root',
})
export class PermissionsService {

    // export interface Permission {
    //     id_permiso: number;
    //     permiso: string;
    //     descripcion: string;
    //     fecha_creacion: string;
    //     activo: Enabled;
    // }

    permissions: Permission[] = [
        {
            id_permiso: 10,
            permiso: "Permiso1",
            descripcion: "permiso de prueba1",
            fecha_creacion: "10/1/2022",
            activo: Enabled.ENABLED,
        },
        {
            id_permiso: 8,
            permiso: "Permiso1",
            descripcion: "permiso de prueba1",
            fecha_creacion: "10/1/2022",
            activo: Enabled.ENABLED,
        },
        {
            id_permiso: 4,
            permiso: "Permiso1",
            descripcion: "permiso de prueba1",
            fecha_creacion: "10/1/2022",
            activo: Enabled.ENABLED,
        }
    ]

    // private _url = environment.apiUrl;
    private _refresh$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    get refresh$() {
        return this._refresh$;
        }

    /** Retorna todos los permisos */
    getPermissions(): Observable<Permission[]> {
        // return this.http.get<Permission[]>(`${this._url}Permisos/GetPermisos`);
        return of(this.permissions)
    }

    /** Crea un nuevo permiso */
    creationPermission(permissionCreated: Permission): Observable<Permission>{
        // return this.http.post<Permission>(`${this._url}Permisos/CreacionPermiso`,permissionCreated)
        // .pipe(
        //     tap(() => {
        //         this._refresh$.next()
        //     })
        // )
        return of()
    }

    /** Edita un permiso */
    permissionModification(permissionEdited: Permission | PermissionPayload): Observable<Permission>{
        // return this.http.put<Permission>(`${this._url}Permisos/ModificacionPermiso`,permissionEdited)
        // .pipe(
        //     tap(() => {
        //         this._refresh$.next()
        //     })
        // )
        return of()
    }
}
