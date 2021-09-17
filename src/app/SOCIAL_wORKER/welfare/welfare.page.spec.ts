import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelfarePage } from './welfare.page';

describe('WelfarePage', () => {
  let component: WelfarePage;
  let fixture: ComponentFixture<WelfarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelfarePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelfarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
