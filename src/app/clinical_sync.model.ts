import { PatientLocation } from './location.model';

export class ClinicalSync {
  constructor(
  
    public today_visit_data:any,
    public upcoming_visit: any,
    public overdue_visit: any,
    public today_task: any,
    public upcoming_task: any,
    public overdue_task: any,
    public task_completed:any,
    public note_count:any,
    public total_patients:any,
    public syncCount:any
    
  ) {}
}