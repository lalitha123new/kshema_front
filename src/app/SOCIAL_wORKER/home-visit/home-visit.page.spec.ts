import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeVisitPage } from './home-visit.page';

describe('HomeVisitPage', () => {
  let component: HomeVisitPage;
  let fixture: ComponentFixture<HomeVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVisitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
