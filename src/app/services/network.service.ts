import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { BehaviorSubject, Observable,fromEvent, merge, of } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
 
export enum ConnectionStatus {
  Online,
  Offline
}
 
@Injectable({
  providedIn: 'root'
})

export class NetworkService {
 
 
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
 
  constructor(private network: Network, private toastController: ToastController, private plt: Platform) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
     
    });
    
  
  }
 
  //this function is caleed to update the network status on app init (device ready)
  public initializeNetworkEvents() {
    console.log("CHECK NET STATUS",this.status.getValue())
 
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE',this.status.getValue());
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
 
    this.network.onConnect().subscribe(() => {
      console.log("NET IS",this.status.getValue())
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }
 
  //this function is called every 50 sec. to update the network status
  public initializeNetworkEvents1() {
    let status =  this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
    this.status.next(status);
    console.log("CHECK NET STATUS",this.status.getValue())
 
    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE',this.status.getValue());
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });
 
    this.network.onConnect().subscribe(() => {
      console.log("NET IS",this.status.getValue())
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }
 
  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
  
    let toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
  }
 
  public onNetworkChange(): Observable<ConnectionStatus> {
  
    return this.status.asObservable();
  }
 
  //used in login page - to get the network status
  public getCurrentNetworkStatus(): ConnectionStatus {
  
    return this.status.getValue();
  }

}