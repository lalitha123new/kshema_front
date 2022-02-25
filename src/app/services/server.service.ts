import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { take, map, tap, delay, switchMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type':  'application/json'
 })
};

const httpOptions2 = {
  headers: new HttpHeaders({
  'Content-Type':  'text'
 })
};

const httpOptions1 = {
  headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" , 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With",
      "Access-Control-Allow-Credentials" : "true",
      "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT"  
     }) 
}; 



@Injectable({
  providedIn: 'root'
})
export class ServerService{
 
   
    constructor(private http1: HttpClient,private http: HttpClient){
        
    }
    //AWS NEW server url
    //public baseUrl= 'http://13.126.225.131:8080/kshema';

    //aws old server url
    //public baseUrl= 'http://13.232.143.181:8080/kshema';

    //nimhans server url
    //public baseUrl= 'http://10.11.3.160:80/kshema';

    //nimhans new domain
    public baseUrl= 'https://kshema.nimhans.ac.in/kshema';

     //nimhans NPLAB server url
    //public baseUrl= 'http://10.11.3.140/kshema';

    //local 
    //public baseUrl= 'http://localhost:8080';
    data: any= {};

    //create new supervisor
    createUser1(userObj){
     
      return this.http.post(this.baseUrl + '/addsupervisor',userObj,httpOptions);
   
    }

    //create new social worker
    createUser2(userObj,selectedTaluka_id){
      return this.http.post(this.baseUrl + '/addpsw/'+selectedTaluka_id,userObj,httpOptions);
   
    }

    //login 
    login(loginObj){
    
     
      return this.http.post(this.baseUrl + '/login1/post',loginObj,httpOptions);
    }

    //get metadata for the logged in social worker
    getMetaData(user_id,role){
      return this.http.get(this.baseUrl + '/getmetaDataLogin/'+user_id+'/'+role);
    }
    getMetaData1(user_id,role){
      return this.http.get(this.baseUrl + '/getmetaDataLogin1/'+user_id+'/'+role);
    }
     //to get the psws data to display in the admin pages
     getPsws(){
      
      return this.http.get(this.baseUrl + '/getPsws');
     
    }

     //to get the  supervisors data to display in the admin pages
     getSupervisors(){
      return this.http.get(this.baseUrl + '/getSupervisors');
     
    }
    //to get the users(psw and supervisor) data - count to display in the admin page dashboard 
    getUsers(){
      return this.http.get(this.baseUrl + '/login1/1');
     
    }

    getUserData(user_id,role){
      
      return this.http.get(this.baseUrl + '/getUser/'+user_id+'/'+role);
    }

    editUser(userObj,user_id,role,status,taluka_id,social_worker_id,supervisor_id){
     
      return this.http.post(this.baseUrl + '/editUser/'+user_id+'/'+role+'/'+status+'/'+taluka_id+'/'+social_worker_id+'/'+supervisor_id,userObj,httpOptions);

    }

    createTaluk(talukaObj,supervisor_id){
     
      return this.http.post(this.baseUrl + '/addtaluka/'+supervisor_id+'/',talukaObj,httpOptions);
    }

    getAlltalukas(){
      return this.http.get(this.baseUrl + '/getAlltalukas',httpOptions);
    }

    getTaluka(taluka_master_id){
      return this.http.get(this.baseUrl + '/getTaluka/'+taluka_master_id,httpOptions);
    }

    editTaluk(edittalukaObj,taluka_master_id,supervisor_id){
      return this.http.post(this.baseUrl + '/edittaluka/'+taluka_master_id+'/'+supervisor_id,edittalukaObj,httpOptions);
    }

    getTalukaSupervisors(){
      return this.http.get(this.baseUrl + '/getTalukaSupervisors',httpOptions);
    }

    getGroupData(supervisor_id){
      return this.http.get(this.baseUrl + '/getGroupData/'+supervisor_id,httpOptions);
    }

    //get all talukas,taluka supervisors and  supervisors 
    getTaluksSupervisors(){
      return this.http.get(this.baseUrl + '/getAllTalukaSupervisors',httpOptions);
    }

    // get talukas and psws
    getallTaluksPsws(){
      return this.http.get(this.baseUrl + '/getAllTalukaPsws',httpOptions);
    }

    // get talukas, psws and supervisors
    getAllTalukasPswsTalukasupervisors(){
      return this.http.get(this.baseUrl + '/getAllTalukaPswsTalukaSupervisors',httpOptions);
    }



    //sync patient demo, visit and task data of a newly added patient with server db
    addPatientServerDb(newPatObj,district,taluk){
     
      console.log("ADD PATIENT"+JSON.stringify(newPatObj))
      return this.http.post(this.baseUrl + '/single_patient/'+"Karnataka"+'@'+district+'@'+taluk,newPatObj,httpOptions);
   
     
      
    }

    //get the kshema_id of a patient from the server db (after synchronising patient data) and save in local db
    getKshemaId(patient_uuid){
    
      return this.http.get(this.baseUrl + '/updateKshemaid/'+patient_uuid,httpOptions);
  
    }

    //sync new viist data of a patient with server db
    addNewVisitServerDb(newVisitObj){
     
      console.log("ADD VISIT"+JSON.stringify(newVisitObj))
      return this.http.post(this.baseUrl + '/addVisit',newVisitObj,httpOptions);
    
    }

    //sync new tasks data of apatient with server db
    addNewTaskServerDb(newTaskObj){
   
      console.log("ADD TASK"+JSON.stringify(newTaskObj))
      //note:removed the update_date from the object as there was issue in backend
      return this.http.post(this.baseUrl + '/addTask',newTaskObj,httpOptions);
     
    }

    //sync updated patient demographic data with server db
     EditedPatientDemoServerDb(editPatObj){
     
      console.log("EDIT PAT"+JSON.stringify(editPatObj))
      return this.http.post(this.baseUrl + '/updatePatient',editPatObj,httpOptions);
     
    }

    //sync the updated tasks data of a patient with server db
    updateTaskStatusServerDb(updateTaskObj){
      console.log("UPDATE TASK"+JSON.stringify(updateTaskObj));
      return this.http.post(this.baseUrl + '/updateTask',updateTaskObj,httpOptions);

    }

    //sync notes for patient with the server db
    addNotes(notesObj){
     console.log("ADD NOTES"+JSON.stringify(notesObj))
     
      return this.http.post(this.baseUrl + '/addNotification',notesObj,httpOptions);
    }

    //sync udid data of patient with server db
    addUDID(udidObj){
    
      console.log("UDID IS"+JSON.stringify(udidObj))
      return this.http.post(this.baseUrl + '/addudid',udidObj,httpOptions);
    }

    //get the tasks data from server db and populate the task_master table in local db
    getTaskMasterList(){
       return this.http.get(this.baseUrl + '/taskMasterList ');
     }

     //get the notes from the supervisor for a particular psw(who is logged into the device) and save data in the local db 
     getSupervisorNotes(sw_id){
  
      return this.http.get(this.baseUrl + '/getallnotificationfromsvr/'+sw_id);
      }


    //get all patients data from server db using group_data_id
    getActivePatitents(group_data_id){
      
      return this.http.get(this.baseUrl + '/patientsListActive/'+group_data_id);
    }
    //get all patients data from server db using group_data_id
    getPatitents(group_data_id){
  
      return this.http.get(this.baseUrl + '/patientsList/'+group_data_id);
    }

    //get patient data using patient_uuid from server db
    getPatitent(patient_uuid){
     
      return this.http.get(this.baseUrl + '/patientdetails/'+patient_uuid);
    }

    //get the unread notes count for supervisor
    getUnreadCount(super_id){

      return this.http.get(this.baseUrl + '/getUnreadnotificationlist/'+super_id);
    }

    //get the notes for patient to display in the supervisor page
    getPatientNotes(patient){
     
      return this.http.get(this.baseUrl + '/getnotification/'+patient);
    }

    //get today's consultation data from server db
    getTodayVisitsServerDb(group_data_id){
      //parameter type_id 1 for today consultation
        return this.http.get(this.baseUrl + '/getPatientsList/1/'+group_data_id);
    }

    //get today's tasks data from server db
    getTodayTasksServerDb(group_data_id){
       //parameter type_id 1 for today tasks
     // return this.http.get(this.baseUrl + '/getTodaytasks/1/'+group_data_id);
     return this.http.get(this.baseUrl + '/getTodaytasks/1');
    }

    //get upcoming consultation data from server db
    getUpcomingVisitsServerDb(group_data_id){
       //parameter type_id 2 for upcoming consultation
      return this.http.get(this.baseUrl + '/getPatientsList/2/'+group_data_id);
    }

    //get upcoming tasks data from the server db
    getUpcomingTasksServerDb(group_data_id){
       //parameter type_id 2 for upcoming tasks
      //return this.http.get(this.baseUrl + '/getTodaytasks/2/'+group_data_id);
      return this.http.get(this.baseUrl + '/getTodaytasks/2');
    }

    //get overdue consultation data from the server db
    getUpOverdueVisitsServerDb(group_data_id){
      //parameter type_id 3 for overdue consultations
      return this.http.get(this.baseUrl + '/getPatientsList/3/'+group_data_id);
      
    }

    //get overdue tasks data from the server db
    getOverdueTasksServerDb(group_data_id){
       //parameter type_id 3 for overdue tasks
      return this.http.get(this.baseUrl + '/getTodaytasks/3');
    }

    getCompletedTasksServerDb(group_data_id){
      return this.http.get(this.baseUrl + '/getTodaytasks/4');
    }
    getTodayCompletedTasksServerDb(group_data_id){
      return this.http.get(this.baseUrl + '/getTodaytasks/5');
    }
    
    //get consultations history of a patient
    getHistory(patient_uuid){
    
      return this.http.get(this.baseUrl + '/getConsultationHistory/'+patient_uuid);
    }

    //get all the notitifications for the logged in supervisor
    getAllNOtifications(super_id){
      return this.http.get(this.baseUrl + '/getnotificationlist/'+super_id);
    }
    //not used 
    updateNotesStatus(notes_uuid){
    
      return this.http.get(this.baseUrl + '/updateReadNotification1/'+notes_uuid,httpOptions);
    }

    //get the list of phcs
    getPHCs(){
      return this.http.get(this.baseUrl + '/getAllPhcs',httpOptions);
    }
    //get the list of districts
    getDistricts(){
      return this.http.get(this.baseUrl + '/getAllDistricts',httpOptions);
    }
    //reversesync from server to device if psw uninstalls the app
    getAllPatientsToDevice(group_data_id){
    
      return this.http.get(this.baseUrl + '/getpatientsData/'+group_data_id,httpOptions);
    }

    //reset password link
    forgotPassword(user_name){
    
      return this.http.get(this.baseUrl + '/forgotpassword/'+user_name,httpOptions);
    }

    //reset password
    newPassword(pass,email){
      return this.http.get(this.baseUrl + '/resetpassword/'+email+'/'+pass,httpOptions);
    }
    
    //reset username link
    forgotUsername(email){
    
      return this.http.get(this.baseUrl + '/forgotusername/'+email,httpOptions);
    }

    //reset username
    newUsername(user_name,email){
    
      return this.http.get(this.baseUrl + '/resetusername/'+email+'/'+user_name,httpOptions);
    }

    //get all tasks of the patient - display in task history  for supervisor
    getPatientAllTasks(patient_uuid){
      return this.http.get(this.baseUrl + '/getallTasks/'+patient_uuid);
    }
    //get the udid data of the patient - display task history for supervisor
    getPatientUDID(patient_uuid){
      return this.http.get(this.baseUrl + '/getPatientUdid/'+patient_uuid);
    }

    //upload images from supervisor to server
    sendImages(fileToUpload:File[],notes_uuid,checkImgSrc){
    
          const _formData=new FormData();
          for(var i=0;i<fileToUpload.length;i++){
           
          _formData.append('files', fileToUpload[i]);
          _formData.append('notes_uuid', notes_uuid);
          _formData.append('checkImgSrc', checkImgSrc);
          
           
          return this.http.post(this.baseUrl+'/uploadMultipleFiles', _formData, 
          {
              reportProgress: true,
              responseType: 'text',
             
              
            });
          }
         
            
        
        
    }
    //not used
    getImages(notes_uuid): Observable<Blob> {
   
      return this.http.get(this.baseUrl + '/getImage/'+notes_uuid,{responseType: 'blob'});
    }
   
}
