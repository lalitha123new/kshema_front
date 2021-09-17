import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminManageSupervisorPage } from './admin-manage-supervisor.page';

describe('AdminManageSupervisorPage', () => {
  let component: AdminManageSupervisorPage;
  let fixture: ComponentFixture<AdminManageSupervisorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageSupervisorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManageSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
