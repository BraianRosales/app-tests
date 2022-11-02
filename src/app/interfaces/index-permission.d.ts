/********** interfaces permiso.*/

import { Enabled } from "../users/model";

export interface Permission {
    id_permiso: number;
    permiso: string;
    descripcion: string;
    fecha_creacion: string;
    activo: Enabled;
}

export interface PermissionsWithName {
    name: string,
}

export interface PermissionName {
    name: string
}

export interface PermissionPayload {
    id_permiso: number;
    permiso: string;
    descripcion: string;
    enabled: Enabled;
}

export interface CRUDPermissionPayload {
    permiso: string;
    descripcion: string;
}

export interface PermissionPropertiesTree {
    name: string;
}


export interface PermissionNode {
    name: string;
    children?: PermissionPropertiesTree[];
}
