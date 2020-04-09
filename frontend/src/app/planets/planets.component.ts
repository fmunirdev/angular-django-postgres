import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Planet, PlanetsPage } from './planet.model';
import { PlanetsService } from './planets.service';
import { AddPlanetComponent } from './add-planet/add-planet.component';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  displayedColumns = [
    'index',
    'planetId',
    'planetName',
    'homeStar',
    'mass',
    'radius',
    'distance',
    'actions',
  ];
  planets: Planet[];
  totalPlanets = 0;
  pageIndex = 0;
  pageSize = 10;
  loadingData: 'loaded' | 'loading' = 'loaded';

  constructor(
    private service: PlanetsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.changePage();
  }

  changePage() {
    this.loadingData = 'loading';
    const djangoPageIndex = this.pageIndex + 1;
    this.service.list(djangoPageIndex).subscribe((page: PlanetsPage) => {
      this.planets = page.results;
      this.totalPlanets = page.count;
      this.loadingData = 'loaded';
    });
  }

  openDialog(data?: Planet) {
    const dialogRef = this.dialog.open(AddPlanetComponent, {
      width: '415px',
      data: data ?? new Planet(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.save(result).subscribe((res: any) => {
          let message: string;
          if (res.status === 201) {
            message = 'A new Planet added successfully.';
          } else if (res.status === 200) {
            message = 'Planet details are updated.';
          } else {
            message = 'Oops! Something went wrong.';
          }
          this.openSnackBar(message);
          this.changePage();
        });
      }
    });
  }

  deletePlanet(planet: Planet) {
    this.service.delete(planet.planetId).subscribe((res: any) => {
      this.openSnackBar(
        res.status === 204
          ? 'Planet deleted successfully.'
          : 'Oops! Something went wrong.'
      );
      this.changePage();
    });
  }

  updatePlanet(planet: Planet) {
    this.openDialog(planet);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'DISMISS', {
      duration: 3000,
    });
  }
}
