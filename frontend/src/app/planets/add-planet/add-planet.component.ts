import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Planet } from '../planet.model';

@Component({
  selector: 'app-add-planet',
  templateUrl: './add-planet.component.html',
  styleUrls: ['./add-planet.component.scss'],
})
export class AddPlanetComponent {
  constructor(
    public dialogRef: MatDialogRef<AddPlanetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Planet
  ) {}
}
