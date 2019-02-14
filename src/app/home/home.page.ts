import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private appId: string;
  private appCode: string;

  public weather: any;

  public constructor(private http: HttpClient) {
    this.appId = "8jmIcMRZ5dDIuZqi7xDy";
    this.appCode = "GsY8bsdL-liCTU0KexRlnQ";
    this.weather = [];
}

  public ngOnInit() { 
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          this.getWeather(position.coords);
      });
  } else {
      console.error("The device does not support geolocation...");
  }
  }

  public getWeather(coordinates: any) {
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
            this.weather = result.forecast;
        }, error => {
            console.error(error);
        });
  }

}


