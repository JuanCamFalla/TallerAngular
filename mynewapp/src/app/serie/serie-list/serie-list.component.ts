import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';


@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})

export class SerieListComponent implements OnInit {

  series: Array<Serie> =[];
  promedioTemporadas: number = 0;
  selected = false;
  selectedSerie!: Serie;

  constructor(private serieService: SerieService) { }
  getSerieList() {
    this.serieService.getSeries().subscribe(series => {
      console.log("series", series);
      this.series = series;
      this.calcularPromedio(this.series);
    });
  }
  ngOnInit() {
    this.getSerieList();
  }

  calcularPromedio(series: Array<Serie>){
    let sumaTemporadas: number = 0;
    series.forEach(serie => {
      sumaTemporadas += serie.seasons;
    });
    this.promedioTemporadas = sumaTemporadas / series.length;
  }

  onSelected(serie: Serie): void {
    this.selectedSerie = serie;
    this.selected = true;
  }
}

