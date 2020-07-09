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
import { Router, Route, ActivatedRoute } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';
import { SaveAddressService } from '../services/save-address.service';


@Component({
  selector: 'app-delivery-tab',
  templateUrl: 'delivery-tab.page.html',
  styleUrls: ['delivery-tab.page.scss'],
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
export class DeliveryTabPage {

  deliveryForm: FormGroup;
  isValidForm: boolean;
  form: any = {};

  constructor(
    private storage: Storage,
    private authGuard: AuthGuard,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tabPage: TabsPage,
    private saveAddressService: SaveAddressService
  ) {

  }

  ngOnInit() {

    /**
     * Reactive Form
     */
    this.deliveryForm = new FormGroup({
      'billingAddress': new FormGroup({
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'addressLine1': new FormControl('', Validators.required),
        'addressLine2': new FormControl('', Validators.nullValidator),
        'city': new FormControl('', Validators.required),
        'state': new FormControl('', Validators.required),
        'country': new FormControl('', Validators.required),
        'postalCode': new FormControl('', Validators.required),
      }),
      'isShippingSame': new FormControl(true),
      'shippingAddress': new FormGroup({
        'firstName': new FormControl(''),
        'lastName': new FormControl(''),
        'addressLine1': new FormControl(''),
        'addressLine2': new FormControl(''),
        'city': new FormControl(''),
        'state': new FormControl(''),
        'country': new FormControl(''),
        'postalCode': new FormControl(''),
      }),
      'createAccount': new FormControl('new'),
      'account': new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'passwords': this.formBuilder.group({
          'newPassword': [null, Validators.compose([
            Validators.required, // is Required
            Validators.pattern(/\d/), // has a number
            Validators.pattern(/[A-Z]/), // has upper case letter
            Validators.pattern(/[a-z]/), //has a lower-case letter
            Validators.pattern(/[@$!%*#?&]/), //has a special character
            Validators.minLength(8), //minimum length of 8 characters
          ])],
          'confirmPassword': [null, Validators.compose([
            Validators.required, // is Required
            Validators.pattern(/\d/), // has a number
            Validators.pattern(/[A-Z]/), // has upper case letter
            Validators.pattern(/[a-z]/), //has a lower-case letter
            Validators.pattern(/[@$!%*#?&]/), //has a special character
            Validators.minLength(8), //minimum length of 8 characters
          ])],
        }, { validator: this.passwordConfirming }),
      })
    });


    /**
     * Get stored data from local storage
     */
    from(this.storage.get('forms-data')).subscribe(res => {
      //Check in the first time do nothing
      if (!res || !res.deliveryForm) {
        return;
      };

      this.form = res;
      const defaultModel = this.form.deliveryForm.model;

      const billingAddress = this.deliveryForm.get('billingAddress');
      const shippingAddress = this.deliveryForm.get('shippingAddress');
      const account = this.deliveryForm.get('account');
      const passwords = account.get('passwords');

      // set inital data from storage
      billingAddress.get('firstName').setValue(defaultModel.billingAddress.firstName);
      billingAddress.get('lastName').setValue(defaultModel.billingAddress.lastName);
      billingAddress.get('addressLine1').setValue(defaultModel.billingAddress.addressLine1);
      billingAddress.get('addressLine2').setValue(defaultModel.billingAddress.addressLine2);
      billingAddress.get('city').setValue(defaultModel.billingAddress.city);
      billingAddress.get('state').setValue(defaultModel.billingAddress.state);
      billingAddress.get('country').setValue(defaultModel.billingAddress.country);
      billingAddress.get('postalCode').setValue(defaultModel.billingAddress.postalCode);

      this.deliveryForm.get('isShippingSame').setValue(defaultModel.isShippingSame);

      shippingAddress.get('firstName').setValue(defaultModel.shippingAddress.firstName);
      shippingAddress.get('lastName').setValue(defaultModel.shippingAddress.lastName);
      shippingAddress.get('addressLine1').setValue(defaultModel.shippingAddress.addressLine1);
      shippingAddress.get('addressLine2').setValue(defaultModel.shippingAddress.addressLine2);
      shippingAddress.get('city').setValue(defaultModel.shippingAddress.city);
      shippingAddress.get('state').setValue(defaultModel.shippingAddress.state);
      shippingAddress.get('country').setValue(defaultModel.shippingAddress.country);
      shippingAddress.get('postalCode').setValue(defaultModel.shippingAddress.postalCode);

      this.deliveryForm.get('createAccount').setValue(defaultModel.createAccount);

      account.get('email').setValue(defaultModel.account.email);
      passwords.get('newPassword').setValue(defaultModel.account.passwords.newPassword);
      passwords.get('confirmPassword').setValue(defaultModel.account.passwords.confirmPassword);

    });


    /**
     * Subscribe to inputs changes and store values in local storage
     */
    this.deliveryForm.valueChanges.subscribe(val => {

      //Check validity to prevent access another tabs.
      this.deliveryForm.valid ? this.authGuard.deliveryAuth = true : this.authGuard.deliveryAuth = false;

      //Assing deliveryForm to exist object 
      this.form.deliveryForm = {
        dirty: this.deliveryForm.dirty,
        model: val,
        status: this.deliveryForm.status
      }

      //Update local storage
      from(this.storage.set('forms-data', this.form)).subscribe();

    });
  }

  ionViewWillEnter() {
    //Check if page navigated from review page with fragment state
    if (this.route.snapshot.fragment) {
      this.onReset();
      this.tabPage.segmentValue = 'delivery';
    }
  }


  isSameOnChange(event) {
    let formGroup = this.deliveryForm.get('shippingAddress');
    if (event.detail.checked) {
      Object.keys(formGroup['controls']).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.setValidators(null);
          control.updateValueAndValidity();
        }
      });
    } else {
      Object.keys(formGroup['controls']).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl && field != 'addressLine2') {
          control.setValidators(Validators.required);
          control.updateValueAndValidity();
        }
      });
    }

  }

  checkAccountOnChange(event) {
    const passwordControl = this.deliveryForm.get('account')['controls'].passwords;
    if (event.detail.value == 'new') {
      passwordControl.setValidators(this.passwordConfirming);
      passwordControl.get('newPassword').setValidators(Validators.compose([
        Validators.required, // is Required
        Validators.pattern(/\d/), // has a number
        Validators.pattern(/[A-Z]/), // has upper case letter
        Validators.pattern(/[a-z]/), //has a lower-case letter
        Validators.pattern(/[@$!%*#?&]/), //has a special character
        Validators.minLength(8), //minimum length of 8 characters
      ]))
      passwordControl.get('confirmPassword').setValidators(Validators.compose([
        Validators.required, // is Required
        Validators.pattern(/\d/), // has a number
        Validators.pattern(/[A-Z]/), // has upper case letter
        Validators.pattern(/[a-z]/), //has a lower-case letter
        Validators.pattern(/[@$!%*#?&]/), //has a special character
        Validators.minLength(8), //minimum length of 8 characters
      ]));
    } else {
      passwordControl.setValidators(Validators.nullValidator);
      passwordControl.get('newPassword').setValidators(Validators.nullValidator)
      passwordControl.get('confirmPassword').setValidators(Validators.nullValidator);
    }
    passwordControl.updateValueAndValidity();
    passwordControl.get('newPassword').updateValueAndValidity();
    passwordControl.get('confirmPassword').updateValueAndValidity();
  }


  onSubmit() {
    const billingAddress = this.deliveryForm.get('billingAddress');
    const shippingAddress = this.deliveryForm.get('shippingAddress');
    const account = this.deliveryForm.get('account');
    const passwords = account.get('passwords');

    let formData: any = new FormData();
    formData.append("first_name", billingAddress.get('firstName').value);
    formData.append("last_name", billingAddress.get('lastName').value);
    formData.append("address_1", billingAddress.get('addressLine1').value);
    formData.append("address_2", billingAddress.get('addressLine2').value);
    formData.append("city", billingAddress.get('city').value);
    formData.append("state", billingAddress.get('state').value);
    formData.append("country", billingAddress.get('country').value);
    formData.append("postal_code", billingAddress.get('postalCode').value);

    formData.append("is_same_address", this.deliveryForm.get('isShippingSame').value ? 0 : 1);

    formData.append("shipping_first_name", shippingAddress.get('firstName').value);
    formData.append("shipping_last_name", shippingAddress.get('lastName').value);
    formData.append("shipping_address_1", shippingAddress.get('addressLine1').value);
    formData.append("shipping_address_2", shippingAddress.get('addressLine2').value);
    formData.append("shipping_city", shippingAddress.get('city').value);
    formData.append("shipping_state", shippingAddress.get('state').value);
    formData.append("shipping_country", shippingAddress.get('country').value);
    formData.append("shipping_postal_code", shippingAddress.get('postalCode').value);

    formData.append("is_new_account", this.deliveryForm.get('createAccount').value == 'new' ? 0 : 1);

    formData.append("email", account.get('email').value);
    formData.append("password", passwords.get('newPassword').value);
    formData.append("password_confirmation", passwords.get('confirmPassword').value);

    // Call saveAddress API, Send data to server
    this.saveAddressService.saveAddress(formData).subscribe();

    //Check All inputs Validation
    this.validateAllFormFields(this.deliveryForm);
    if (this.deliveryForm.valid) {
      this.isValidForm = true;
      this.router.navigate(['shipping']);
      this.tabPage.segmentValue = 'shipping';
    } else {
      this.isValidForm = false;
    }
  }

  onReset() {
    this.isValidForm = null;
    this.deliveryForm.reset();
    this.deliveryForm.get('createAccount').setValue('new');
    this.deliveryForm.get('isShippingSame').setValue(true);
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

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

}

