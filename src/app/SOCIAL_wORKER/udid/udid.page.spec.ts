import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdidPage } from './udid.page';

describe('UdidPage', () => {
  let component: UdidPage;
  let fixture: ComponentFixture<UdidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
