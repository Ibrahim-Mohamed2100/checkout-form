import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  segmentValue:string = 'delivery';

  constructor(
    private router: Router,
    public authGuard: AuthGuard,
  ) {
    console.log("TabsPage -> this.router.url", this.router.url)
    this.segmentValue = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.segmentChanged(this.segmentValue);
  }

  segmentChanged(event){
    this.router.navigate([`/${event}`]);
  }

}
