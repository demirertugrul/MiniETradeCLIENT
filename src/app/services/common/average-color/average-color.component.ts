import { Component, Input, OnInit } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
@Component({
  selector: 'app-average-color',
  templateUrl: './average-color.component.html',
  styleUrls: ['./average-color.component.scss']
})
export class AverageColorComponent implements OnInit {

  @Input() container:any;
  constructor() { }

  ngOnInit(): void {
      
  }

  async averageColor(){
    const fac = new FastAverageColor();
  
          fac.getColorAsync(this.container.src)
              .then(color => {
                  this.container.style.backgroundColor = color.rgba;
                  this.container.style.color = color.isDark ? '#fff' : '#000';
              })
              .catch(e => {
                  console.log(e);
              });

  
  }
}
