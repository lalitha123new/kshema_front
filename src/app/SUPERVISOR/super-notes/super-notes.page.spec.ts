import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuperNotesPage } from './super-notes.page';

describe('SuperNotesPage', () => {
  let component: SuperNotesPage;
  let fixture: ComponentFixture<SuperNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
