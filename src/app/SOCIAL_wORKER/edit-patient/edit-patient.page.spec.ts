import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPatientPage } from './edit-patient.page';

describe('EditPatientPage', () => {
  let component: EditPatientPage;
  let fixture: ComponentFixture<EditPatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
