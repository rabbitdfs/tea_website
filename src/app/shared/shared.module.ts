import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import {CardDescripionValidPipe} from "./pipes/card-descripion.valid.pipe";



@NgModule({
  declarations: [
    CardDescripionValidPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardDescripionValidPipe,
  ],
})
export class SharedModule { }
