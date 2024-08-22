import { Component, OnInit, Inject } from '@angular/core';

import{FormBuilder,FormGroup,Validators}from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA}from "@angular/material/dialog";

import{MatSnackBar}from "@angular/material/snack-bar"

import * as moment from 'moment';

import { Director } from 'src/app/Interfaces/director';
import { Movie} from 'src/app/Interfaces/movie'; 
import { DirectorService } from 'src/app/Services/director.service';
import { MovieService } from 'src/app/Services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {

  formMovie: FormGroup;
  titleAction: string = "New ";
  buttonAction: string = "Create";
  listDirectors: Director[]=[];
  
  constructor(
    private dialogReference: MatDialogRef<DialogAddEditComponent>,
    private _movieService: MovieService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _directorservice: DirectorService,
    private _movieservice: MovieService,
    @Inject (MAT_DIALOG_DATA) public dataMovie:Movie
  ) { 
    this.formMovie = this.fb.group({
      movieName:['', Validators.required],
      gender:['', Validators.required],
      duration:['', Validators.required],
      directorKey:['', Validators.required]
    })

    this._directorservice.getList().subscribe({
      next:(data)=>{
        this.listDirectors = data;
      },error:(e)=>{}
    })
  }

  showAlert(msg: string, action: string) {
    this._snackBar.open(msg, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  addEditMovie() {
    console.log("Datos antes de la actualización:", this.formMovie.value);

    const modelo: Movie = {
      idMovies: this.dataMovie ? this.dataMovie.idMovies : 0, // Asegúrate de que idMovie tenga un valor válido
      movieName: this.formMovie.value.movieName,
      gender: this.formMovie.value.gender,
      duration: this.formMovie.value.duration,
      directorKey: this.formMovie.value.directorKey
    }

    if (!this.dataMovie) {  // Si no hay dataMovie, estamos creando una nueva película
      console.log("Creando nueva película:", modelo);
      this._movieservice.add(modelo).subscribe({
        next: (data) => {
          console.log("Película añadida:", data);
          this.showAlert("Movie Added", "Done");
          this.dialogReference.close("Create");
        },
        error: (e) => {
          console.error("Error al añadir la película:", e);
          this.showAlert("Cant be creaded", "Error");
        }
      });
    } else {
      console.log("Actualizando película existente:", modelo);
      this._movieservice.update(this.dataMovie.idMovies, modelo).subscribe({
        next: (data) => {
          console.log("Película actualizada:", data);
          this.showAlert("Actualización Completada", "Listo");
          this.dialogReference.close("Actualizada");
        },
        error: (e) => {
          console.error("Error al actualizar la película:", e);
          this.showAlert("No se pudo actualizar", "Error");
        }
      });
    }
}


  ngOnInit(): void {
    if(this.dataMovie){
      this.formMovie.patchValue({
        idMovie: this.dataMovie.idMovies,
        movieName: this.dataMovie.movieName,
        gender: this.dataMovie.gender,
        duration: this.dataMovie.duration,
        directorKey: this.dataMovie.directorKey
      })
      this.titleAction = "Edit "
      this.buttonAction = "Update"
    }
  }

}
