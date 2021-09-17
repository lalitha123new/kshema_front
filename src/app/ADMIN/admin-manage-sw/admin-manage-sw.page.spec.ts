import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminManageSwPage } from './admin-manage-sw.page';

describe('AdminManageSwPage', () => {
  let component: AdminManageSwPage;
  let fixture: ComponentFixture<AdminManageSwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageSwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminManageSwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
