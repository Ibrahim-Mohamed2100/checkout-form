import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShippingTabPage } from './shipping-tab.page';

describe('ShippingTabPage', () => {
  let component: ShippingTabPage;
  let fixture: ComponentFixture<ShippingTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
