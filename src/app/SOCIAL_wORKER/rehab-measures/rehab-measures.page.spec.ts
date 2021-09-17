import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RehabMeasuresPage } from './rehab-measures.page';

describe('RehabMeasuresPage', () => {
  let component: RehabMeasuresPage;
  let fixture: ComponentFixture<RehabMeasuresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabMeasuresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RehabMeasuresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
