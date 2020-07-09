import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryTabPage } from './delivery-tab.page';

describe('DeliveryTabPage', () => {
  let component: DeliveryTabPage;
  let fixture: ComponentFixture<DeliveryTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
