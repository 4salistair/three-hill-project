import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

AgmCoreModule.forRoot({
  apiKey: 'AIzaSyA_X6mefuVdOyLzCK1hFv-OTYi23oI-5kg'
});


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})



export class WelcomeComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit() {


  }

}
