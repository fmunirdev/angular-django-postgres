import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestApiService } from '../rest-api.service';
import { Planet, PlanetsPage } from './planet.model';

@Injectable()
export class PlanetsService {
  constructor(private restApiService: RestApiService) {}

  save(planetData: Planet) {
    const { planetName, homeStar, ...data } = planetData;
    const body = {
      planet_name: planetName,
      home_star: homeStar,
      ...data,
    };

    if (data?.planetId) {
      return this.restApiService.send('put', `planets/${data.planetId}`, body);
    }
    return this.restApiService.send('post', 'planets', body);
  }

  get(id: number) {
    return this.restApiService.send('get', `planets/${id}`).pipe(
      map((res: any) => {
        const data = res.body;
        return new Planet(
          data.planet_id,
          data.planet_name,
          data.home_star,
          data.mass,
          data.radius,
          data.distance
        );
      })
    );
  }

  list(pageIndex: number = 1): Observable<PlanetsPage> {
    return this.restApiService.send('get', 'planets', null, pageIndex).pipe(
      map((res: any) => {
        const { results, count } = res.body;
        let planets = results.map((data: any) => {
          return new Planet(
            data.planet_id,
            data.planet_name,
            data.home_star,
            data.mass,
            data.radius,
            data.distance
          );
        });
        return { results: planets, count };
      })
    );
  }

  delete(id: number) {
    return this.restApiService.send('delete', `planets/${id}`);
  }
}
