import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchDetailPage } from '../match-detail/match-detail';
import { JugadoresPage } from '../jugadores/jugadores';
import { EncuentrosService } from '../../providers/encuentros/encuentros';
import { UsersService } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { UtilsService } from '../../providers/utils/utils';
import { ResultadoPage } from '../resultado/resultado';

import { AppVersion } from '@ionic-native/app-version';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public encuentro:any = [];
  public club:any;
  public appVersion;

  constructor(public navCtrl: NavController, 
              private _es:EncuentrosService, 
              public _us:UsersService,
              public storage:Storage,
              public _utilsService:UtilsService,
              public version:AppVersion) {
        
          this.club = _us.getUserData().club;
          this.listEncuentrosStore();

          version.getVersionNumber().then(data=>{
            this.appVersion = data;
          });


  }

  goToResult(encuentrosId:any)
  {
    this.navCtrl.push(ResultadoPage,{'encuentrosId':encuentrosId});
  }

  goTomatchDetail(encuentrosId:any)
  {
    this.navCtrl.push(MatchDetailPage,{'encuentrosId':encuentrosId});
  }

  buenaFe(encuentrosId:any){
    this.navCtrl.push(JugadoresPage,{'encuentrosId':encuentrosId});
  }

  listEncuentros(refresher)
  {
  
    this._es.removeEncuentrosStore();

    this._es.getEncuentros().then( res => 
    {
      this.listEncuentrosStore();
      refresher.complete();

    });


    // //this._utilsService.showMessages('Mensaje','Actualizando ...');

    // this._es.getEncuentros().then((result)=>{
    //    // this._utilsService.dismissMessages();

    //     this.encuentro = result ;
      
    //     //this.storage.set('encuentro',this.enc);
    //     //localStorage.setItem('encuentros', JSON.stringify(this.enc));


    // },(err)=>{
    //   //this._utilsService.dismissMessages();
    //   this._utilsService.showMessages('Error','No se Puede Acceder al Servidor, por favor, Intente nuevamente.',true) ;
    // });


    
  

    //this._es.getEncuentros().subscribe( data=>{ this.encuentro = data; console.table(data) });
  }


  listEncuentrosStore()
  {
    return this._es.getEncuentrosStore().then((result)=>
    {
      let enc = [];
    
      for (let index = 0; index < result.rows.length; index++)
      {
        enc.push( result.rows.item(index) );
      }
      
      this.encuentro =  enc ;
    });
  }

  logout()
  {
    this._us.logout();
    this.navCtrl.setRoot(LoginPage);
  }



}
