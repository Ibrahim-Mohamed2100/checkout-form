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
  selector: 'app-payment-tab',
  templateUrl: 'payment-tab.page.html',
  styleUrls: ['payment-tab.page.scss'],
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
export class PaymentTabPage {

  paymentForm: FormGroup;
  isValidForm: boolean;
  form: any = {};
  defaultModel: any;

  constructor(
    private storage: Storage,
    private authGuard: AuthGuard,
    private router: Router,
    private tabPage: TabsPage,
  ) { }

  ngOnInit() {
    /**
     * Reactive Form
     */
    this.paymentForm = new FormGroup({
      'cardNumber': new FormControl('', [Validators.required]),
      'cvv': new FormControl('', Validators.required),
      'expiryDate': new FormControl('', Validators.required),
    });

    /**
     * Get stored data from local storage
     */
    from(this.storage.get('forms-data')).subscribe(res => {
      //Check in the first time do nothing
      this.form = res;
      if (!res || !res.paymentForm) {
        return;
      };

      const defaultModel = this.form.paymentForm.model;

      // set inital data from storage
      this.paymentForm.get('cardNumber').setValue(defaultModel.cardNumber);
      this.paymentForm.get('cvv').setValue(defaultModel.cvv);
      this.paymentForm.get('expiryDate').setValue(defaultModel.expiryDate);
    });


    /**
     * Subscribe to inputs changes and store values in local storage
     */
    this.paymentForm.valueChanges.subscribe(val => {

      //Check validity to prevent access another tabs.
      this.paymentForm.valid ? this.authGuard.userAuth = true : this.authGuard.userAuth = false;

      //Assing paymentForm to exist object 
      this.form.paymentForm = {
        dirty: this.paymentForm.dirty,
        model: val,
        status: this.paymentForm.status
      }

      //Update local storage
      from(this.storage.set('forms-data', this.form)).subscribe();

    });
  }

  onSubmit() {
    this.validateAllFormFields(this.paymentForm);
    if (this.paymentForm.valid) {
      this.isValidForm = true;
      this.router.navigate(['review']);
    } else {
      this.isValidForm = false;
    }
  }

  onReset() {
    this.isValidForm = null;
  }

  onPrevious() {
    this.router.navigate(['shipping']);
    this.tabPage.segmentValue = 'shipping';
  }


  /**
   * 
   * Helper Methods
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
