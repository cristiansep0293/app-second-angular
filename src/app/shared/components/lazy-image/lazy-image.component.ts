import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;
  @Input()
  public alt: string = '';
  public imgLoaded: boolean;

  constructor() {
    this.imgLoaded = false;
  }

  ngOnInit(): void {
    if (!this.url) throw new Error('Property url is required.');
  }

  public onLoad():void {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 1000);
  }

}
