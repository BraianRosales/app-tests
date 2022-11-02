/**
 * Item de la barra de navegación.
 */
 export interface NavbarItem {
    description: string;
    icon: string;
    navigationItems: NavigationItem[];
}

/**
 * Item de navegación dentro de un item de la barra de navegación.
 * 
 * Es el item que contiene la ruta.
 */
export interface NavigationItem {
    description: string;
    icon: string;
    route: string;
    checked: boolean;
}

export interface User {
    id: number;
    nombre: string;
    legajo: string;
    perfil: string;
    password: string;
    token: string;
    fotoUrl: string;
    qr?: string;
    permisos: string[];
}

export interface DynamicSearchResult<T> {
    lastSearch: string | null;
    searchResult: T[];
}
