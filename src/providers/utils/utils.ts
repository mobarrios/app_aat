import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//components
import { AlertController, LoadingController } from 'ionic-angular';


/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsService {

  public alert ;
  public loading;

  constructor(public http: HttpClient,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) { }


  //menssages
  showMessages(title:any = '', msg:any ='',btn:boolean=false)
  {
    if(btn){
      this.alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        enableBackdropDismiss : false,
        buttons: ['Cerrar']
      });
    }else{
      this.alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        enableBackdropDismiss : false,
      });
    }
    


    this.alert.present();
  }

  dismissMessages()
  {
    this.alert.dismiss();
  }

  //loading
  showLoading(msg:any='')
  {
    this.loading = this.loadingCtrl.create({
      content : msg,
      dismissOnPageChange	: true,

    }).present();
    
  }

  
}
