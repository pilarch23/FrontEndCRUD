import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Movie } from './Interfaces/movie';
import { MovieService } from './Services/movie.service';
import { Director } from './Interfaces/director';
import { DirectorService } from './Services/director.service';

import{MatSnackBar} from '@angular/material/snack-bar'

import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Dialogs/dialog-delete/dialog-delete.component';
import { DialogAddEditDirectorComponent } from './Dialogs/dialog-add-edit-director/dialog-add-edit-director.component';
import { DialogDeleteDirectorComponent } from './Dialogs/dialog-delete-director/dialog-delete-director.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

var Value = new Array();
var directorsValues = new Array();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['MovieName', 'Gender', 'Duration', 'Director', 'Operations'];
  displayedColumnsD: string[] = ['DirectorName', 'Age', 'Active', 'Operations'];
  dataSource = new MatTableDataSource<Movie>();
  dataSourceD = new MatTableDataSource<Director>();

  @ViewChild('moviePaginator') moviePaginator!: MatPaginator;
  @ViewChild('directorPaginator') directorPaginator!: MatPaginator;

  constructor(
    private _movieService: MovieService,
    private _directorService: DirectorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showMovies();
    this.showDirectors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.moviePaginator;
    this.dataSourceD.paginator = this.directorPaginator;
  }

  applyFilter(event: Event, type:string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (type === 'movies') {
      this.dataSource.filter = filterValue;
    } else if (type === 'directors') {
      this.dataSourceD.filter = filterValue;
    }
  }

  showMovies() {
    this._movieService.getList().subscribe({
      next: (dataResponse) => {
        console.log("Movies Data received:", dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (e) => {
        console.error("Movies Error:", e);
      }
    });
  }

  dialogNewMovie() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result =>{
      if (result === "Create"){
        this.showMovies();
      }
    });
  }

  dialogEditMovie(dataMovie : Movie) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data:dataMovie
    }).afterClosed().subscribe(result =>{
      if (result === "Update"){
        this.showMovies();
      }
    });
  }
  
  showAlert(msg: string, action: string) {
    this._snackBar.open(msg, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  // app.component.ts
dialogDeleteMovie(dataMovie: Movie): void {
  this.dialog.open(DialogDeleteComponent,{
    disableClose:true,
    data:dataMovie
  }).afterClosed().subscribe(result =>{
    if (result === "Delete"){
      this._movieService.delete(dataMovie.idMovies).subscribe({
        next:(data)=>{
          this.showAlert("Movie deleted","Done")
          this.showMovies();
        },
        error:(e)=> {console.log(e)}
      })
    }
  });
}

  showDirectors() {
    this._directorService.getList().subscribe({
      next: (dataResponse) => {
        console.log("Directors Data received:", dataResponse);
        this.dataSourceD.data = dataResponse;
      },
      error: (e) => {
        console.error("Directors Error:", e);
      }
    });
  }



  dialogNewDirector() {
    this.dialog.open(DialogAddEditDirectorComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result =>{
      if (result === "Director Created"){
        this.showDirectors();
      }
    });  }

    dialogEditDirector(dataDirector : Director) {
      this.dialog.open(DialogAddEditDirectorComponent,{
        disableClose:true,
        width:"350px",
        data:dataDirector
      }).afterClosed().subscribe(result =>{
        if (result === "Director Updated"){
          this.showDirectors();
        }
      });
    }

    dialogDeleteDirector(dataDirector: Director): void {
      this.dialog.open(DialogDeleteDirectorComponent,{
        disableClose:true,
        data:dataDirector
      }).afterClosed().subscribe(result =>{
        if (result === "Delete Director"){
          this._directorService.delete(dataDirector.idDirector).subscribe({
            next:(data)=>{
              this.showAlert("Director deleted","Done")
              this.showDirectors();
            },
            error:(e)=> {console.log(e)}
          })
        }
      });
    }
}
