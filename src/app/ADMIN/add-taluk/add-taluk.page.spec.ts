import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTalukPage } from './add-taluk.page';

describe('AddTalukPage', () => {
  let component: AddTalukPage;
  let fixture: ComponentFixture<AddTalukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTalukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTalukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
