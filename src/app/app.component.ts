import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laspistasdeanni';
  isSidaNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router ) {}

  onNavDesative():boolean{
    if(this.router.url=='/login'){
      return false
    }
    return true
  } 

  onHeaderDesactive():boolean{
    if(this.router.url=='/login'){
      return false
    }
    return true
  }
  
  onToggleSideNav(data:SideNavToggle):void{
    this.isSidaNavCollapsed = data.collapsed
    this.screenWidth = data.screenWidth
  }



}
