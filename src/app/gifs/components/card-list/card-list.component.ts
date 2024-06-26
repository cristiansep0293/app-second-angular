import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input()
  public gifs:Gifs[];

  constructor(private gifsService: GifsService) {
    this.gifs = [];
  }

}
