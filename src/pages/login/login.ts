import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersService } from '../../providers/users/users';
import { UtilsService } from '../../providers/utils/utils';

import { Storage } from '@ionic/storage';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:string;
  pass:string;
  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _us:UsersService,
              public _utilsService:UtilsService,
              public storage:Storage,
              public platform:Platform,
            ){

    // if(_us.isActive())
    //       this.goToHome();

    //       console.log(_us.isActive());

      
  }

  test(){
    console.log('test');
  }

  goToHome() {
      this.navCtrl.setRoot(HomePage);
  }

  validate(){
    
    this._utilsService.showMessages('Validando..');

    this._us.postLogin(this.user, this.pass).then(result=>{
        
        this.data = result ;
        this._us.user = this.data;

        if(this.platform.is('cordova'))
        {
          this.storage.set('user',this._us.user);
        }
        else{
         localStorage.setItem('user', JSON.stringify(this._us.user));
        }

        this._utilsService.dismissMessages();
        this.navCtrl.setRoot(HomePage);

    },(err)=>{
      this._utilsService.dismissMessages();
      this._utilsService.showMessages('Error',err['message'],true) ;

    });
    


    // this._us.postLogin(this.user, this.pass);
    // this.goToHome();
  }

}
