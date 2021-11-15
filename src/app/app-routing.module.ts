import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./SOCIAL_WORKER/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'addpatient',
    loadChildren: () => import('./SOCIAL_WORKER/addpatient/addpatient.module').then( m => m.AddpatientPageModule)
  },
  
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./ADMIN/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'admin-manage-sw',
    loadChildren: () => import('./ADMIN/admin-manage-sw/admin-manage-sw.module').then( m => m.AdminManageSwPageModule)
  },
  {
    path: 'admin-manage-supervisor',
    loadChildren: () => import('./ADMIN/admin-manage-supervisor/admin-manage-supervisor.module').then( m => m.AdminManageSupervisorPageModule)
  },
  {
    path: 'admin-manage-taluk',
    loadChildren: () => import('./ADMIN/admin-manage-taluk/admin-manage-taluk.module').then( m => m.AdminManageTalukPageModule)
  },
  {
    path: 'supervisor-dashboard',
    loadChildren: () => import('./SUPERVISOR/supervisor-dashboard/supervisor-dashboard.module').then( m => m.SupervisorDashboardPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'patient-details',
    loadChildren: () => import('./SOCIAL_wORKER/patient-details/patient-details.module').then( m => m.PatientDetailsPageModule)
  },
  {
    path: 'phc-visit',
    loadChildren: () => import('./SOCIAL_wORKER/phc-visit/phc-visit.module').then( m => m.PhcVisitPageModule)
  },
  {
    path: 'phone-call',
    loadChildren: () => import('./SOCIAL_wORKER/phone-call/phone-call.module').then( m => m.PhoneCallPageModule)
  },
  {
    path: 'home-visit',
    loadChildren: () => import('./SOCIAL_wORKER/home-visit/home-visit.module').then( m => m.HomeVisitPageModule)
  },
  {
    path: 'udid',
    loadChildren: () => import('./SOCIAL_wORKER/udid/udid.module').then( m => m.UdidPageModule)
  },
  {
    path: 'welfare',
    loadChildren: () => import('./SOCIAL_wORKER/welfare/welfare.module').then( m => m.WelfarePageModule)
  },
  {
    path: 'assessment-needs',
    loadChildren: () => import('./SOCIAL_wORKER/assessment-needs/assessment-needs.module').then( m => m.AssessmentNeedsPageModule)
  },
  {
    path: 'rehab-measures',
    loadChildren: () => import('./SOCIAL_wORKER/rehab-measures/rehab-measures.module').then( m => m.RehabMeasuresPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./SOCIAL_wORKER/history/history.module').then( m => m.HistoryPageModule)
  },
 
  
  {
    path: 'add-user',
    loadChildren: () => import('./ADMIN/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'all-patients',
    loadChildren: () => import('./SOCIAL_wORKER/all-patients/all-patients.module').then( m => m.AllPatientsPageModule)
  },
  {
    path: 'edit-patient',
    loadChildren: () => import('./SOCIAL_wORKER/edit-patient/edit-patient.module').then( m => m.EditPatientPageModule)
  },
  {
    path: 'add-taluk',
    loadChildren: () => import('./ADMIN/add-taluk/add-taluk.module').then( m => m.AddTalukPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./ADMIN/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'edit-taluk',
    loadChildren: () => import('./ADMIN/edit-taluk/edit-taluk.module').then( m => m.EditTalukPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./SOCIAL_wORKER/notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'newpass',
    loadChildren: () => import('./newpass/newpass.module').then( m => m.NewpassPageModule)
  },
  {
    path: 'newusername',
    loadChildren: () => import('./newusername/newusername.module').then( m => m.NewusernamePageModule)
  },
  {
    path: 'task-history',
    loadChildren: () => import('./SOCIAL_wORKER/task-history/task-history.module').then( m => m.TaskHistoryPageModule)
  },
 
 
  
 
 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
