import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhcVisitPage } from './phc-visit.page';

describe('PhcVisitPage', () => {
  let component: PhcVisitPage;
  let fixture: ComponentFixture<PhcVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhcVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhcVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
