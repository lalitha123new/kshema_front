import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddpatientPage } from './addpatient.page';

describe('AddpatientPage', () => {
  let component: AddpatientPage;
  let fixture: ComponentFixture<AddpatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpatientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddpatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
