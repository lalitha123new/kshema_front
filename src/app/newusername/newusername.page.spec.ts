import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewusernamePage } from './newusername.page';

describe('NewusernamePage', () => {
  let component: NewusernamePage;
  let fixture: ComponentFixture<NewusernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewusernamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewusernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
