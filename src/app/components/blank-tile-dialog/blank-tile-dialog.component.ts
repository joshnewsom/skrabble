import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sk-blank-tile-dialog',
  templateUrl: './blank-tile-dialog.component.html',
  styleUrls: ['./blank-tile-dialog.component.scss']
})
export class BlankTileDialogComponent implements OnInit {

  public letter: string;

  constructor(
    private dialogRef: MatDialogRef<BlankTileDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    // TODO: validate
    this.dialogRef.close(this.letter);
  }

}
