import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  reviewData:any;

  constructor(
    private storage: Storage,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    //get The stored data for displaying
    from(this.storage.get('forms-data')).subscribe(res => {
      this.reviewData = res;
    });
  }

  onRestart() {
    from(this.storage.remove('forms-data')).subscribe(res => {
    //TODO: navigate to entry page and clear runtime data
    this.router.navigate(['/delivery'], { fragment: 'restart' });
    });
  }

}
