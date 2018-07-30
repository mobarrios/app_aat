import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { UsersService } from '../providers/users/users';
import { HomePage } from '../pages/home/home';

import { SQLite } from '@ionic-native/sqlite';
import { DataBaseProvider } from '../providers/data-base/dataBase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen,
               public _us:UsersService,
               public _dbs:DataBaseProvider,
               public sqlite: SQLite
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      this.createDatabase();

      if(_us.isActive())
        this.rootPage = HomePage;
      else
        this.rootPage = LoginPage;
    });
  }
  
  private createDatabase(){
   
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this._dbs.setDatabase(db);
      this._dbs.createTableUsers().then(res=>{console.log('tabla usuarios creada')});
      this._dbs.createTableEncuentros().then(res=>{console.log('tabla encuentros creada')});
      this._dbs.createTableEncuentrosJugadores().then(res=>{console.log('tabla encuentros_jugadores creada')});
      this._dbs.createTableEncuentrosResultados().then(res=>{console.log('tabla encuentros_resultados creada')});
      this._dbs.createTableJugadores().then(res=>{console.log('tabla jugadores creada')});
    })
    .then(() =>{
      this.splashScreen.hide();
      //this.rootPage = 'HomePage';
    })
    .catch(error =>{
      console.error(error);
    });
  }
}

