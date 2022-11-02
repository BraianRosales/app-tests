import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NavbarItem } from '../interfaces';
import { ProfileService } from './profile.service';

@Injectable()
export class NavbarService {
    /** Evento que se dispara cuando se navega a un item de la barra de navegación. */
    private navigationEventSource: BehaviorSubject<string | null> =
        new BehaviorSubject<string | null>(null);
    navigationEvent: Observable<string | null> =
        this.navigationEventSource.asObservable();

    /** Evento que se dispara cuando se cierra o abre la barra de navegación. */
    private toggleEventSource: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    toggleEvent: Observable<boolean> = this.toggleEventSource.asObservable();

    /** Un `array` con los items de la barra de navegación. */
    navbarItems: NavbarItem[] = [];

    constructor(private profileService: ProfileService) {
        this.profileService.userChangeEvent().subscribe((user) => {
            if (user.legajo) {
                this._initNavbarItems();
            }
        });
    }

    /**
     * Abre o cierra la barra de navegación
     */
    toggle() {
        this.toggleEventSource.next(!this.toggleEventSource.value);
    }

    /**
     * Devuelve los items de navegación del usuario actual
     * @returns `NavbarItem[]`
     */
    getNavbarItems(): NavbarItem[] {
        return this.navbarItems;
    }

    /**
     * Navega a un item de la barra de navegación por ruta
     * @param description la ruta del item
     */
    highlightByRoute(route: string): void {
        this.navigationEventSource.next(route);
    }

    /**
     * Inicializa la barra de navegación con los items correspondientes
     */
    private _initNavbarItems() {
        let preItems: NavbarItem[] = [];

        this.navbarItems = [];

        if (this.profileService.hasModuleAccess('reports')) {
            preItems.push(this._getReportsItems());
        }

        if (this.profileService.hasModuleAccess('reservations')) {
            preItems.push(this._getReservationsItems());
        }

        if (this.profileService.hasModuleAccess('control')) {
            preItems.push(this._getQualityControlItems());
        }

        if (this.profileService.hasModuleAccess('labels')) {
            preItems.push(this._getLabelItems());
        }

        if (this.profileService.hasModuleAccess('operations')) {
            preItems.push(this._getOperationsItems());
        }

        if (this.profileService.hasModuleAccess('novelties')) {
            preItems.push(this._getNoveltiesItems());
        }

        if (this.profileService.hasModuleAccess('development')) {
            preItems.push(this._getDevelopmentItems());
        }

        if (this.profileService.hasModuleAccess('platforms')) {
            preItems.push(this._getPlatformItems());
        }

        if (this.profileService.hasModuleAccess("counts")) {
            preItems.push(this._getCountsItems());
        }
        
        if (this.profileService.hasModuleAccess('users')) {
            preItems.push(this._getUserControl());
        }

        for (let item of preItems) {
            if (item.navigationItems.length) {
                this.navbarItems.push(item);
            }
        }
    }

    private _getReportsItems(): NavbarItem {
        let reports: NavbarItem = {
            description: 'Reportes',
            icon: 'fa fa-fw fa-chart-bar',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('my-reports')) {
            reports.navigationItems.push({
                description: 'Mis reportes',
                icon: 'fa fa-fw fa-clipboard-list',
                route: 'reports/my-reports',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('stock-plu')) {
            reports.navigationItems.push({
                description: 'Stock Plu',
                icon: 'fa fa-fw fa-clipboard-list',
                route: 'reports/stock-plu',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('stock-133-location')) {
            reports.navigationItems.push(
                {
                    description: "Stock 133 Ubicacion",
                    icon: "fas fa-fw fa-pallet",
                    route: "reports/stock-133-location",
                    checked: false,
                }
            );
        }

        if (this.profileService.hasRouteAccess('stock-133-serial')) {
            reports.navigationItems.push(
                {
                    description: "Stock 133 Serie",
                    icon: "fas fa-fw fa-pallet",
                    route: "reports/stock-133-serial",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('dispatch-planification')) {
            reports.navigationItems.push({
                description: 'Planificación de despacho',
                icon: 'fa fa-fw fa-truck-loading',
                route: 'reports/dispatch-planification',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('pending-reschedule')) {
            reports.navigationItems.push({
                description: 'Pendientes de gestión',
                icon: 'fa fa-fw fa-calendar-times',
                route: 'reports/pending-reschedule',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('novelties-report')) {
            reports.navigationItems.push(
                {
                    description: "Reporte de novedades",
                    icon: "fa fa-fw fa-rss-square",
                    route: "reports/novelties-report",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('quality-controls')) {
            reports.navigationItems.push(
                {
                    description: "Controles de Calidad",
                    icon: "fa fa-fw fa-undo",
                    route: "reports/quality-controls",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('operation-state')) {
            reports.navigationItems.push({
                description: 'Estado operación',
                icon: 'fa fa-fw fa-project-diagram',
                route: 'reports/operation-state',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('stock-by-location')) {
            reports.navigationItems.push({
                description: 'Stock por ubicación',
                icon: 'fas fa-fw fa-search-location',
                route: 'reports/stock-by-location',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('reprints')) {
            reports.navigationItems.push({
                description: 'Reporte de reimpresiones',
                icon: 'fas fa-fw fa-tags',
                route: 'reports/reprints',
                checked: false,
            });
        }

        return reports;
    }

    private _getReservationsItems(): NavbarItem {
        let reservations: NavbarItem = {
            description: 'Reservas',
            icon: 'fa fa-fw fa-box-open',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('reservation-preparation')) {
            reservations.navigationItems.push({
                description: 'Preparación de reservas',
                icon: 'fa fa-fw fa-pallet',
                route: 'reservations/reservation-preparation',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('stockless-reservations')) {
            reservations.navigationItems.push(
                {
                    description: "Reservas con error al preparar",
                    icon: "fa fa-fw fa-dolly",
                    route: "reservations/stockless-reservations",
                    checked: false,
                },
            );
        }

        if (this.profileService.hasRouteAccess('reservation-serialization')) {
            reservations.navigationItems.push({
                description: 'Serialización de reserva',
                icon: 'fa fa-fw fa-barcode',
                route: 'reservations/reservation-serialization',
                checked: false,
            });
        }

        return reservations;
    }

    private _getQualityControlItems(): NavbarItem {
        let control: NavbarItem = {
            description: 'Calidad',
            icon: 'fa fa-fw fa-wrench',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('return-control')) {
            control.navigationItems.push({
                description: 'Control de Retorno',
                icon: 'fa fa-fw fa-sync',
                route: 'control/return-control',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('technical-control')) {
            control.navigationItems.push({
                description: 'Control Técnico',
                icon: 'fa fa-fw fa-microchip',
                route: 'control/technical-control',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('commercial-control')) {
            control.navigationItems.push({
                description: 'Control Comercial',
                icon: 'fa fa-fw fa-cash-register',
                route: 'control/commercial-control',
                checked: false,
            });
        }

        return control;
    }

    private _getLabelItems(): NavbarItem {
        let label: NavbarItem = {
            description: 'Etiquetas',
            icon: 'fa fa-fw fa-tag',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('reprint-label')) {
            label.navigationItems.push({
                description: 'Impresión de etiquetas',
                icon: 'fa fa-fw fa-print',
                route: 'labels/reprint-label',
                checked: false,
            });
        }

        return label;
    }

    private _getOperationsItems(): NavbarItem {
        let operations: NavbarItem = {
            description: 'Operaciones',
            icon: 'fa fa-fw fa-cog',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('delivery-coordination')) {
            operations.navigationItems.push({
                description: 'Gestión de reservas',
                icon: 'fa fa-fw fa-tasks',
                route: 'operations/delivery-coordination',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('expeditions-control')) {
            operations.navigationItems.push({
                description: 'Control de expediciones',
                icon: 'fa fa-fw fa-route',
                route: 'operations/expeditions-control',
                checked: false,
            });
        }

        return operations;
    }

    private _getNoveltiesItems(): NavbarItem {
        let novelties: NavbarItem = {
            description: 'Novedades',
            icon: 'fa fa-fw fa-exclamation-circle',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('current-novelties')) {
            novelties.navigationItems.push({
                description: 'Novedades actuales',
                icon: 'fa fa-fw fa-bell',
                route: 'novelties/current-novelties',
                checked: false,
            });
        }

        return novelties;
    }

    private _getPlatformItems(): NavbarItem {
        let platforms: NavbarItem = {
            description: 'Andenes',
            icon: 'fa fa-fw fa-warehouse',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('platform-reservation')) {
            platforms.navigationItems.push({
                description: 'Reserva de andenes',
                icon: 'fa fa-fw fa-clipboard-list',
                route: 'platforms/platform-reservation',
                checked: false,
            });
        }

        return platforms;
    }

    private _getDevelopmentItems(): NavbarItem {
        let development: NavbarItem = {
            description: 'Desarrollo',
            icon: 'fa fa-fw fa-bug',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('component-debugging')) {
            development.navigationItems.push({
                description: 'Depuración',
                icon: 'fa fa-fw fa-puzzle-piece',
                route: 'development/component-debugging',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('zpl')) {
            development.navigationItems.push({
                description: 'ZPL',
                icon: 'fa fa-fw fa-horse-head',
                route: 'development/zpl',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('snackbar-tester')) {
            development.navigationItems.push({
                description: 'Snack Bar Tester',
                icon: 'fa fa-fw fa-comment',
                route: 'development/snackbar-tester',
                checked: false,
            });
        }

        return development;
    }

    private _getCountsItems(): NavbarItem{
        let counts: NavbarItem = {
            description: "Conteos",
            icon: "fa fa-fw fa-calculator",
            navigationItems: [],
        };
        
        if (this.profileService.hasRouteAccess('counts-list')){
            counts.navigationItems.push(
                {
                    description: "Gestión de conteos",
                    icon: "fa fa-fw fa-clipboard-list",
                    route: "counts/counts-list",
                    checked: false,  
                }
            );
        }

        return counts;
    }

    private _getUserControl(): NavbarItem {
        let users: NavbarItem = {
            description: 'Usuarios',
            icon: 'fa fas fa-users-cog',
            navigationItems: [],
        };

        if (this.profileService.hasRouteAccess('permissions')) {
            users.navigationItems.push({
                description: 'Permisos',
                icon: 'fa fa-address-card',
                route: 'users/permissions',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('profiles')) {
            users.navigationItems.push({
                description: 'Perfiles',
                icon: 'fa far fa-users',
                route: 'users/profiles',
                checked: false,
            });
        }

        if (this.profileService.hasRouteAccess('roles')) {
            users.navigationItems.push({
                description: 'Roles',
                icon: 'fas fa-user-tag',
                route: 'users/roles',
                checked: false,
            });
        }

        return users;
    }
}
