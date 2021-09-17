import { PatientLocation } from './location.model';

export class Count {
  constructor(
    public notes_data:any,
    public phc_count: number,
    public home_count: number,
    public phone_count:number,
    public wel_count:number,
    public udid_count:number,
    public rehab_count:number
  ) {}
}