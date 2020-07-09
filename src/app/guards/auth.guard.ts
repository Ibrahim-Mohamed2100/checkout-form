import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userAuth: boolean = false;
  deliveryAuth: boolean = false;
  shippingAuth: boolean = false;
  paymentAuth: boolean = false;

  constructor(
    private router: Router,
    private storage: Storage,
    ) {
    from(this.storage.get('forms-data')).subscribe(res => {
      //TODO: Set The Pages auth based on forms validity stored in storage.

    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.deliveryAuth) {
      return true;
    } else {
      this.router.navigate(["delivery"]);
      return false;
    }
  }
  
}
