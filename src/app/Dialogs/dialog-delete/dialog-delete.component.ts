// dialog-delete.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/Interfaces/movie';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {
  public idValue:number = 0;

  constructor(
    private dialogReference: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMovie: Movie
  ) {}

  ngOnInit(): void {
    console.log('Movie data received:', this.dataMovie.idMovies); // Verifica que dataMovie tenga el ID
    this.idValue = this.dataMovie.idMovies;
    console.log(this.idValue);
    console.log(this.dataMovie);
  }

  confirm_Delete() {
    console.log(this.idValue);
    if (this.dataMovie) {
      this.dialogReference.close("Delete");
    } else {
      console.error('No movie ID available for deletion.');
    }
  }
}
