import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkMenuModule } from '@angular/cdk/menu';


@NgModule({
  declarations: [SidenavComponent,SublevelMenuComponent],
  imports: [BrowserModule,AppRoutingModule,MatTooltipModule,CdkMenuModule],
  exports:[ SublevelMenuComponent, SidenavComponent]
})
export class SidenavModule { }
