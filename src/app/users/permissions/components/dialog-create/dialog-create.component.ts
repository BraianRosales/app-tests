import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { Permission } from 'src/app/users/index-user';


@Component({
    selector: 'app-dialog-create',
    templateUrl: './dialog-create.component.html',
    styleUrls: ['./dialog-create.component.scss'],
})
export class DialogCreateComponent implements OnInit {
    /** Se crea propiedad de tipo Permission(interface) para guardar los value del formulario. */
    permissionCreated: Permission | null = null;

    /**Variable donde se guardan todos los permisos */
    permissions: Permission[] = []

    /** Se crea instancia de formulario con nombre myForm con sus respectivos campos, agregando validaciónes. */
    myForm: FormGroup = this.fb.group({
        permiso: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
    });

    /**retorna true si el permiso esta vacío */
    permissionIsEmpty: boolean = false;
    /**retorna true si la descripcion esta vacía */
    descriptionIsEmpty: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DialogCreateComponent>,
        private fb: FormBuilder,
        private permissionsService: PermissionsService,
        private snackBarService: SnackBarService,
    ) {}

    ngOnInit(): void {
        let permission: string = ''
        this.myForm.get('permiso')?.valueChanges.subscribe( value => {
            permission = value;
            permission = permission.trim()
            this.permissionIsEmpty = permission.length === 0;
        })

        let desciption: string = ''
        this.myForm.get('descripcion')?.valueChanges.subscribe( value => {
            desciption = value;
            desciption = desciption.trim()
            this.descriptionIsEmpty = desciption.length === 0;
        })
    }


    /**Retorna true si el permiso o la descripción estan vacíos */
    inputsEmpty(){
        return this.permissionIsEmpty || this.descriptionIsEmpty;
    }
    

    /** Si el formulario es invalido y fue tocado retorna true, generando una alerta en la UI desde el template.*/
    notValid() {
        return this.myForm.invalid && this.myForm.touched;
    }

    savePermission() {
            this.permissionCreated = this.myForm.value;
            this.permissionsService.creationPermission(this.permissionCreated!).subscribe(() => this.snackBarService.open(`Permiso creado correctamente`, "Aceptar", 7500, "success-snackbar"))
            this.dialogRef.close();
        }
}


