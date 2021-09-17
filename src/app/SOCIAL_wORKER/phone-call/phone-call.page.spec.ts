import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneCallPage } from './phone-call.page';

describe('PhoneCallPage', () => {
  let component: PhoneCallPage;
  let fixture: ComponentFixture<PhoneCallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneCallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
