import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { from } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-shipping-tab',
  templateUrl: 'shipping-tab.page.html',
  styleUrls: ['shipping-tab.page.scss'],
  animations: [
    trigger('requiredTrigger', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('150ms', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('150ms', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
  ]
})
export class ShippingTabPage {

  shippingForm: FormGroup;
  form:any = {};

  constructor(
    private storage: Storage,
    private authGuard: AuthGuard,
    private router: Router,
    private tabPage: TabsPage
  ) { 

    // from(this.storage.get('forms-data')).subscribe(res => {
    // this.form = res;
    //   });
    

  }

  ngOnInit() {
    /**
     * Reactive Form
     */
    this.shippingForm = new FormGroup({
      'method': new FormControl('2', Validators.required),
      'isGift': new FormControl(false),
      'giftOptions': new FormGroup({
        'includeGiftRecipt': new FormControl(false),
        'name': new FormControl(''),
        'message': new FormControl(''),
        'wrap': new FormControl(false),
      }),
    });


    /**
     * Get stored data from local storage
     */
    from(this.storage.get('forms-data')).subscribe(res => {
      //Check in the first time do nothing |  With set initial form data
      if(!res || !res.shippingForm){
        this.form = res;
        this.form.shippingForm = {
          dirty: this.shippingForm.dirty,
          model: this.shippingForm.value,
          status: this.shippingForm.status
        }
        from(this.storage.set('forms-data', this.form)).subscribe();

        return;
      };

      this.form = res;
      const defaultModel = this.form.shippingForm.model;

      // set inital data from storage
      const giftOptions = this.shippingForm.get('giftOptions');
      this.shippingForm.get('method').setValue(defaultModel.method);
      this.shippingForm.get('isGift').setValue(defaultModel.isGift);
      giftOptions.get('includeGiftRecipt').setValue(defaultModel.giftOptions.includeGiftRecipt);
      giftOptions.get('name').setValue(defaultModel.giftOptions.name);
      giftOptions.get('message').setValue(defaultModel.giftOptions.message);
      giftOptions.get('wrap').setValue(defaultModel.giftOptions.wrap);
    });


    /**
     * Subscribe to inputs changes and store values in local storage
     */
    this.shippingForm.valueChanges.subscribe(val => {

      //Check validity to prevent access another tabs.
      this.shippingForm.valid? this.authGuard.shippingAuth = true:this.authGuard.shippingAuth = false;

      //Assing shippingForm to exist object 
      this.form.shippingForm = {
          dirty: this.shippingForm.dirty,
          model: val,
          status: this.shippingForm.status
        }

      //Update local storage
      from(this.storage.set('forms-data', this.form)).subscribe(res=>{
        
      });

    });
  }

  onSubmit() {
    if(this.shippingForm.valid){
      this.router.navigate(['payment']);
      this.tabPage.segmentValue = 'payment';
    }
  }

  onReset() {
    //Set The Button with type reset
  }

  onPrevious(){
    this.router.navigate(['delivery']);
    this.tabPage.segmentValue = 'delivery';

  }

}
