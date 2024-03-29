import { Component, Input, OnInit } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-gif',
  templateUrl: './card-gif.component.html',
  styleUrl: './card-gif.component.css'
})
export class CardGifComponent implements OnInit {
  @Input()
  public gif!:Gifs;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Property gif required.');
  }
}
