import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//trabajar ractive forms
import{ReactiveFormsModule}from'@angular/forms';
//peticiones http
import{HttpClientModule}from'@angular/common/http';
//Para trabajar con tablas
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
//controles del formulario
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatButtonModule} from '@angular/material/button'; 
//mensajes de alerta
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
//iconos
import {MatIconModule} from '@angular/material/icon'; 
//trabajar con modales
import {MatDialogModule} from '@angular/material/dialog'; 
//cuadriculas
import {MatGridListModule} from '@angular/material/grid-list';

import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';
import { DialogAddEditDirectorComponent } from './Dialogs/dialog-add-edit-director/dialog-add-edit-director.component';
import { DialogDeleteDirectorComponent } from './Dialogs/dialog-delete-director/dialog-delete-director.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogDeleteComponent,
    DialogAddEditDirectorComponent,
    DialogDeleteDirectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
