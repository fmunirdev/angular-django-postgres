import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(private restApiService: RestApiService) {}

  ngOnInit(): void {
    this.restApiService
      .send('get')
      .subscribe((res: any) => (this.message = res.body.message));
  }
}
