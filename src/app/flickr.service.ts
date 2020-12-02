import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FlickrPhoto{
  farm: string,
  id: string,
  secret: string,
  title: string,
  server: string,
}

export interface FlickrOutput{
  photos: {
    photo: FlickrPhoto[]
  };
}

@Injectable({
  providedIn: 'root'
})


export class FlickrService {
  public URL = 'https://api.flickr.com/services/rest?method=flickr.photos.search';
  constructor(
    public http: HttpClient
  ) { }

  getPhotos(lat, lon): Observable<any>{
    return this.http.get(this.URL + '&api_key=' + environment.flickr.key +'&lat=' + lat + '&lon=' + lon + '&format=json&nojsoncallback=1&per_page=100').pipe(map((res: FlickrOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((ph: FlickrPhoto) => {
        const photoObj = {
          url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`
        }
        urlArr.push(photoObj);
      })
      return urlArr;
    }));
  }
}
