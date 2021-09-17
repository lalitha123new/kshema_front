import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Plugins, Capacitor, AppState } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NetworkService, ConnectionStatus } from './services/network.service';
import { OfflineManagerService } from './services/offline-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isOnline:boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private networkService : NetworkService,
    private offlineManager : OfflineManagerService,
  ) {
    this.initializeApp();
  }

    
  initializeApp() {
  
      this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
  
      this.offlineManager.openDatabase();
      
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Online) {
        
           //when the app initializes, sync data if exists in the request(storage) table and fetch data from serverdb to device db
          this.offlineManager.checkForEvents().subscribe();
          let role = sessionStorage.getItem("role");
  
          if(role == "psw"){
          
          //fetch notes from server at a time interval if online, and psw login
          this.offlineManager.fetchServerNotes();
          }
        }
      });
      
      });

    setInterval(() =>{
     
       //update the network status every 20min.
       this.networkService.initializeNetworkEvents1();
       //this.offlineManager.fetchServerNotes();
     
      
    },200000); // time in milliseconds

  }

  ngOnInit() {
  
    Plugins.Storage.get({ key: 'syncDate&Time' }).then(object => {
      if(object.value==null){
        Plugins.Storage.set({key: 'syncDate&Time', value: '01-01-2001'});
      }
    });
  
   
    
  }

}
