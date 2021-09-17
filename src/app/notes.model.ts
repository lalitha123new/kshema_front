import { PatientLocation } from './location.model';

export class Notes {
  constructor(
    
    public notes_id: number,
    public notes_uuid: string,
    public notes_message : string ,
    public read_flag: number ,
    public patient_uuid:string,
    public sender_user_id: number,
    public recipient_user_id: number,
    public created_at: any
    
  ) {}
}