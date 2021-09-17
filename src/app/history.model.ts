import { PatientLocation } from './location.model';

//patient_id,social_worker_id,visit_date,visit_type,visit_details,followup_date,prv_visit_id
export class History {
  constructor(
    public history_data:any,
    public notes_data:any,
    public pat_data:any,
    public task_data:any
    
    
  ) {}
}