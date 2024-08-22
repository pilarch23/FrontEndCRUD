import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Director } from 'src/app/Interfaces/director';
@Component({
  selector: 'app-dialog-delete-director',
  templateUrl: './dialog-delete-director.component.html',
  styleUrls: ['./dialog-delete-director.component.css']
})
export class DialogDeleteDirectorComponent implements OnInit {

  public idValue:number = 0;

  constructor(
    private dialogReference: MatDialogRef<DialogDeleteDirectorComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDirector: Director
  ) {}

  ngOnInit(): void {
    console.log('Movie data received:', this.dataDirector.idDirector); // Verifica que dataMovie tenga el ID
    this.idValue = this.dataDirector.idDirector;
    console.log(this.idValue);
    console.log(this.dataDirector);
  }

  confirm_Delete() {
    console.log(this.idValue);
    if (this.dataDirector) {
      this.dialogReference.close("Delete Director");
    } else {
      console.error('No movie ID available for deletion.');
    }
  }
}
