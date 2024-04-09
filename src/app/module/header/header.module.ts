import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,CdkMenuModule,BrowserModule,MatTooltipModule],
  exports:[HeaderComponent]
})
export class HeaderModule { }
