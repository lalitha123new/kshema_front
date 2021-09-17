import { PatientLocation } from './location.model';

export class Record {
  constructor(
    
    public visit_type: any,
    public visit_details : any,
    public followup_date:any
    
  ) {}
}