import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageColorComponent } from './average-color.component';



@NgModule({
  declarations: [AverageColorComponent],
  imports: [
    CommonModule
  ],
  exports: [AverageColorComponent]
})
export class AverageColorModule { }
