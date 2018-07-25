import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EncuentrosService } from '../../providers/encuentros/encuentros';
import { UtilsService } from '../../providers/utils/utils';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
      public platform : Platform,
      public _es:EncuentrosService,
      public _us:UtilsService)
   {
    this.encuentroId = navParams.get('encuentrosId');
    console.log(this.encuentroId);
    this.getData();

  }

  sendPlayers()
  {
    this._us.showLoading('Datos Enviados');

    this.navCtrl.pop();
  }

  getData()
   { 
    let data ;
     this._es.getEncuentro(this.encuentroId).subscribe(data => {
       
       this.localNombre = data['equipoLocal']['club']['nombre'];
       this.visitaNombre = data['equipoVisitante']['club']['nombre'];

       console.log(this.localNombre);
       console.log(this.visitaNombre);
      
      });
   }
 

}
