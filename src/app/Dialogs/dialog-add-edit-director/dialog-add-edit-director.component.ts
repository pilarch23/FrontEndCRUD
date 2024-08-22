import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Director } from 'src/app/Interfaces/director';
import { DirectorService } from 'src/app/Services/director.service';

@Component({
  selector: 'app-dialog-add-edit-director',
  templateUrl: './dialog-add-edit-director.component.html',
  styleUrls: ['./dialog-add-edit-director.component.css']
})
export class DialogAddEditDirectorComponent implements OnInit {

  formDirector: FormGroup;
  titleAction: string = "New Director";
  buttonAction: string = "Create";
  listDirectors: Director[] = [];
  
  constructor(
    private dialogReference: MatDialogRef<DialogAddEditDirectorComponent>,
    private _directorService: DirectorService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataDirector: Director
  ) { 
    this.formDirector = this.fb.group({
      directorName: ['', Validators.required],
      age: ['', Validators.required],
      active: [false, Validators.required], // Corrección aquí
    });

    this._directorService.getList().subscribe({
      next: (data) => {
        this.listDirectors = data;
      },
      error: (e) => {}
    });
  }

  showAlert(msg: string, action: string) {
    this._snackBar.open(msg, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  addEditDirector() {
    console.log("Datos antes de la actualización:", this.formDirector.value);

    const modelo: Director = {
      idDirector: this.dataDirector ? this.dataDirector.idDirector : 0,
      directorName: this.formDirector.value.directorName,
      age: this.formDirector.value.age,
      active: this.formDirector.value.active,
    };

    if (!this.dataDirector) {
      console.log("Creando nuevo director:", modelo);
      this._directorService.add(modelo).subscribe({
        next: (data) => {
          console.log("Director añadido:", data);
          this.showAlert("Director Added", "Done");
          this.dialogReference.close("Director Created");
        },
        error: (e) => {
          console.error("Error al añadir director:", e);
          this.showAlert("Can't be created", "Error");
        }
      });
    } else {
      console.log("Actualizando director existente:", modelo);
      this._directorService.update(this.dataDirector.idDirector, modelo).subscribe({
        next: (data) => {
          console.log("Director actualizado:", data);
          this.showAlert("Update Completed", "Done");
          this.dialogReference.close("Director Updated");
        },
        error: (e) => {
          console.error("Error al actualizar el director:", e);
          this.showAlert("Can't be updated", "Error");
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.dataDirector) {
      this.formDirector.patchValue({
        idDirector: this.dataDirector.idDirector,
        directorName: this.dataDirector.directorName,
        age: this.dataDirector.age,
        active: this.dataDirector.active,
      });
      this.titleAction = "Edit Director";
      this.buttonAction = "Update";
    }
  }
}
