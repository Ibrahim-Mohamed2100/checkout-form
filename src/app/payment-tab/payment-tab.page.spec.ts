import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentTabPage } from './payment-tab.page';

describe('PaymentTabPage', () => {
  let component: PaymentTabPage;
  let fixture: ComponentFixture<PaymentTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
