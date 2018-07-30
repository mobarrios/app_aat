import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MatchDetailPage } from '../pages/match-detail/match-detail';
import { ResultadoPage } from '../pages/resultado/resultado';
import { HttpClientModule } from '@angular/common/http';


//providers

import { EncuentrosService } from '../providers/encuentros/encuentros';
import { UsersService } from '../providers/users/users';

//storage
import { IonicStorageModule } from '@ionic/storage';
import { JugadoresPage } from '../pages/jugadores/jugadores';
import { UtilsService } from '../providers/utils/utils';
import { DataBaseProvider } from '../providers/data-base/dataBase';
import { SQLite } from '../../node_modules/@ionic-native/sqlite';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MatchDetailPage,
    ResultadoPage,
    JugadoresPage,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MatchDetailPage,
    ResultadoPage,
    JugadoresPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersService,
    EncuentrosService,
    UtilsService,
    DataBaseProvider,
    SQLite,
  ]
})
export class AppModule {}
