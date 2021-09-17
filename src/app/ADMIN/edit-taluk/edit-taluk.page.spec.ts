import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTalukPage } from './edit-taluk.page';

describe('EditTalukPage', () => {
  let component: EditTalukPage;
  let fixture: ComponentFixture<EditTalukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTalukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTalukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
