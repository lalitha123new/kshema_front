import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminManageTalukPage } from './admin-manage-taluk.page';

describe('AdminManageTalukPage', () => {
  let component: AdminManageTalukPage;
  let fixture: ComponentFixture<AdminManageTalukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageTalukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManageTalukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
