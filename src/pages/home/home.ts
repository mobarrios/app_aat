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


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public encuentro:any = [];
  public club:any;

  public enc = {
    'id':'',
    'status': 1,
  };

  
  constructor(public navCtrl: NavController, 
              private _es:EncuentrosService, 
              public _us:UsersService,
              public storage:Storage,
              public _utilsService:UtilsService) {

    this.club = _us.getUserData().club;
  }

  goToResult(encuentrosId:any)
  {
    console.log(encuentrosId);
    this.navCtrl.push(ResultadoPage,{'encuentrosId':encuentrosId});
  }

  goTomatchDetail()
  {
    this.navCtrl.push(MatchDetailPage);
  }

  buenaFe(encuentrosId:any){
    this.navCtrl.push(JugadoresPage,{'encuentrosId':encuentrosId});
  }

  listEncuentros(refresher)
  {
    
    //this._utilsService.showMessages('Mensaje','Actualizando ...');

    this._es.getEncuentros().then((result)=>{
       // this._utilsService.dismissMessages();

        this.encuentro = result ;
        this.enc.id = result[0].id;
        this.enc.status = 1;

        //this.storage.set('encuentro',this.enc);
        //localStorage.setItem('encuentros', JSON.stringify(this.enc));


    },(err)=>{
      //this._utilsService.dismissMessages();
      this._utilsService.showMessages('Error',err['message'],true) ;
    });

    refresher.complete();

    //this._es.getEncuentros().subscribe( data=>{ this.encuentro = data; console.table(data) });
  }


  logout()
  {
    this._us.logout();
    this.navCtrl.setRoot(LoginPage);
  }



}
