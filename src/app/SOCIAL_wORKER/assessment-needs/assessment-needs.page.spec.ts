import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssessmentNeedsPage } from './assessment-needs.page';

describe('AssessmentNeedsPage', () => {
  let component: AssessmentNeedsPage;
  let fixture: ComponentFixture<AssessmentNeedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentNeedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentNeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
