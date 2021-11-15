import { PatientLocation } from './location.model';


export class Clinical {
  constructor(
    public clinical_visits_id:number,
    public clinical_visits_uuid:string,
    public patient_uuid:string,
    public social_worker_id:number,
    public visit_date: any,
    public visit_type: string,
    public visit_details: any,
    public followup_date: any,
    public prv_visit_uuid: string,
    public created_at: any
    
  ) {}
}