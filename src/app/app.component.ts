import { Component, OnInit } from '@angular/core';
import { FlickrService } from './flickr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public lat = 51.678418;
  public lng = 7.809007;
  public mapType = 'roadmap';
  public locationChosen = false;
  public title = 'skeps-assignment';
  public p: number = 1;
  public images = [];

  constructor(
    public flickrService: FlickrService
  ) {

  }
  ngOnInit(): void {

  }

  // on choose location
  onChoseLocation(event): void {
    this.locationChosen = true;   
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.getPhotos(this.lat, this.lng) 
  }

  // get photos basis of location
  getPhotos(lat, lng): void {
    this.flickrService.getPhotos(lat, lng).toPromise().then((res) => {
      console.log(res);
      this.images = res;
    });
  }
}
