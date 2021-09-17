import { PatientLocation } from './location.model';

export class Patient {
  constructor(
    
    public patient_id:number,
    public patient_uuid:number,
    public group_data_id:number,
    public kshema_id: any,
    public name: string,
    public demographic_info: string,
    public consent_arr: string,
    public needs_assessment: string,
    public uuid_info: string,
    public status: string,
    public created_at:any
  ) {}
}