import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gifs, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private GYPHY_API_KEY: string;
  private _tagsHistory:string[];
  private serviceURL: string;
  public gifs: Gifs[];

  constructor(private http: HttpClient) {
    this._tagsHistory = [];
    this.gifs = [];
    this.serviceURL = 'https://api.giphy.com/v1/gifs';
    this.GYPHY_API_KEY = '1orboTRgh1uHT9fVRGB8y5ldsp5gtuho';
    this.loadLocalStorage();
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0])
   }

  get tagHistory():string[] {
    return [...this._tagsHistory];
  }

  private organizeTagHistory(tag: string):void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory = this._tagsHistory.splice(0, 9);
  }

  public searchTag(tag: string):void {
    this.organizeTagHistory(tag);
    this._tagsHistory.unshift(tag.toLowerCase());
    this.saveLocalStorage();
    const params = new HttpParams()
      .set('api_key', this.GYPHY_API_KEY)
      .set('q', tag)
      .set('limit', 10);
    this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params } ).subscribe(res => {
      this.gifs = res.data;
    });
  }

  public saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  public loadLocalStorage():void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }
}
