import { PatientLocation } from './location.model';

export class Task {
  constructor(
    
    public tasks_id: number,
    public tasks_uuid: string,
    public patient_uuid : string ,
    public task_type: number ,
    public creation_date : any,
    public task_due_date : any,
    public task_details : string,
    public status : string,
    public update_date : any,
    public prev_record_id : number,
    public origin_record_id : number,
    public created_at : any
  ) {}
}