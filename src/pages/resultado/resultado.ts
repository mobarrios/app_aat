import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EncuentrosService, Encuentro } from '../../providers/encuentros/encuentros';
import { UtilsService } from '../../providers/utils/utils';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  public localNombre:any;
  public visitaNombre:any;
  public encuentroId:any ;

  public enc:Encuentro;

  public ls1_1:any = 0;
  public ls1_2:any = 0;
  public ls1_3:any = 0;

  public vs1_1:any = 0;
  public vs1_2:any = 0;
  public vs1_3:any = 0;

  public ls2_1:any = 0;
  public ls2_2:any = 0;
  public ls2_3:any = 0;

  public vs2_1:any = 0;
  public vs2_2:any = 0;
  public vs2_3:any = 0;

  public ld_1:any = 0;
  public ld_2:any = 0;
  public ld_3:any = 0;

  public vd_1:any = 0;
  public vd_2:any = 0;
  public vd_3:any = 0;



  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public platform : Platform,
      public _es:EncuentrosService,
      public _us:UtilsService,
      public storage:Storage)
   {
    this.encuentroId = navParams.get('encuentrosId');
    
    this.getData();

  }

  sendPlayers()
  {
   
    let data:any = [{
      'id': this.encuentroId , 
        'ls1_1':this.ls1_1,
        'ls1_2':this.ls1_2,
        'ls1_3':this.ls1_3,
        'vs1_1':this.vs1_1,
        'vs1_2':this.vs1_2,
        'vs1_3':this.vs1_3,
        'ls2_1':this.ls2_1,
        'ls2_2':this.ls2_2,
        'ls2_3':this.ls2_3,
        'vs2_1':this.vs2_1,
        'vs2_2':this.vs2_2,
        'vs2_3':this.vs2_3,
        'ld_1':this.ld_1,
        'ld_2':this.ld_2,
        'ld_3':this.ld_3,
        'vd_1':this.vd_1,
        'vd_2':this.vd_2,
        'vd_3':this.vd_3,
    }];

    if(this.platform.is('cordova'))
      {
              this.storage.set(this.encuentroId, this.enc);
      }else{
              localStorage.setItem(this.encuentroId, JSON.stringify(this.enc));  
      }
    
      
    this._us.showLoading('Datos Enviados');
    this.navCtrl.pop();
  }

  getData()
   { 
      let data ;
       this._es.getEncuentro(this.encuentroId).subscribe(data => {

       this.localNombre   = data['equipoLocal']['club']['nombre'];
       this.visitaNombre  = data['equipoVisitante']['club']['nombre'];

       console.log(this.localNombre);
       console.log(this.visitaNombre);
      
      });

    this.enc = this._es.getEncuentrosLocalData(this.encuentroId);

   }
 

}
