import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Permission } from 'src/app/users/index-user';


@Component({
    selector: 'app-dialog-edit',
    templateUrl: './dialog-edit-permissions.component.html',
    styleUrls: ['./dialog-edit-permissions.component.scss'],
})
export class DialogEditPermissionsComponent implements OnInit {
    /** Se creo propiedad para guardar información desde el ngOnInit y reflejar esa información en los inputs del formulario.*/
    enabled: string | null = null;

    /**flag que indica si los inputs del perfil son iguales. */
    inputPermissionEquals: boolean = false;

    /**flag que indica si el perfil fue editado. */
    editedPermission: boolean = false;

    /**flag que indica que los inputs de la descripcion son iguales. */
    inputDescriptionEquals: boolean = false;

    /** Contiene los campos del formulario en el pop up de editar.*/
    myForm: FormGroup = this.fb.group({
        id_permiso: [this.data.id_permiso],
        permiso: [this.data.permiso, [Validators.required]],
        descripcion: [this.data.descripcion, [Validators.required]],
        enabled: [this.data.activo],
    });

    constructor(
        public dialogRef: MatDialogRef<DialogEditPermissionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Permission,
        private fb: FormBuilder,
        private permissionService: PermissionsService,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {
        if (this.data.activo == 1) {
            this.enabled = 'Si';
        } else {
            this.enabled = 'No';
        }

        let currentPermission = this.data.permiso;
        let inputChangePermission = this.data.permiso;

        this.inputPermissionEquals = currentPermission === inputChangePermission

        let currentDescription = this.data.descripcion;
        let inputChangeDescription = this.data.descripcion;

        this.inputDescriptionEquals = currentDescription === inputChangeDescription
        
        this.editedPermission = this.inputPermissionEquals ===  this.inputDescriptionEquals 

        /**Input change Permiso */
        this.myForm.get('permiso')?.valueChanges.subscribe( value => {
            inputChangePermission = value;
            this.inputPermissionEquals =  currentPermission === inputChangePermission
            this.editedPermission = (this.inputPermissionEquals === true);
        })

        /**Input change Descripción */
        this.myForm.get('descripcion')?.valueChanges.subscribe( value => {
            inputChangeDescription = value;
            this.inputDescriptionEquals =  currentDescription === inputChangeDescription
            this.editedPermission = (this.inputDescriptionEquals === true);
        })
    }

    /** Si el formulario es invalido y fue tocado retorna true, generando una alerta en la UI desde el template.*/
    notValid() {
        return this.myForm.invalid && this.myForm.touched;
    }

    /** Metodo que se ejecuta con el evento click del botón Guardar.*/
    savePermission() {
        this.permissionService
            .permissionModification(this.myForm.value).subscribe(() => this.snackBarService.open(`Permiso número ${this.data.id_permiso} editado`, "Aceptar", 7500, "success-snackbar"));
    }
    
}
