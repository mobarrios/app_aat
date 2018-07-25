import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersService {

  result:any ;
  body:any ;
  headers:any;
  url:string = 'http://interclubes-aat-api.sysmo.com.ar/api';

  public val:boolean;
  public tk;

  public user = {
    'token' : '',
    'club' : '',
    'expiration' : '',
  };

  public httpOptions = 
  {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ this.getToken(),
        'Access-Control-Allow-Origin':'*',
      })
    };


  constructor(private http: HttpClient, 
              public alertCtrl: AlertController,
              public storage:Storage, 
              public platform:Platform) {}



  postLogin(user:string , pass:string)
  {


    //let headers = new HttpHeaders();
    //let data = new URLSearchParams();

    //headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');
    
    //data.append("email",user);
    //data.append("password",pass);

    //testing
    //this.body =  {'email':'leandro.antonelli2@gmail.com' , 'password':'Aa123456!'};

    this.body =  {'email':user, 'password':pass};

    let url = this.url + "/Account/Login"; 
    // promise
    return new Promise((resolve, reject)=>{
        this.http.post(url, this.body,this.httpOptions).subscribe(
          res=>{resolve(res);
        },(err)=>{reject(err);})
    });


  }

  isActive()
  {
    // let token ;

    // if(this.platform.is('cordova'))
    //   token = this.storage.get('token');
    // else
    //   token = localStorage.getItem('token');

    // if(token)
    //   return true;
    // else
    //   return false;
      
  }

  getToken()
  {
    if(this.platform.is('cordova'))
    {
     // this.tk = this.storage.get('token');
      this.storage.get('user').then((val) => {
        if(val)
          this.tk = val.token;
      });

    }else{
      let data = JSON.parse(localStorage.getItem('user'));  
      if(data)
        this.tk = data.token;
    }

    return this.tk;
  }
  
  logout()
  {
    if(this.platform.is('cordova'))
      {
        this.storage.clear();
      }else{
        localStorage.clear();
      } 
  }

  getUserData()
  {
    if(this.platform.is('cordova'))
    {
      this.storage.get('user').then((val) => {
        if(val)
          this.user = val;
      });

    }else{
      let data = JSON.parse(localStorage.getItem('user'));  
      if(data)
        this.user = data;
    }

    return this.user;
  }
  
}
