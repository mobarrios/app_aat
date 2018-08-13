import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataBaseProvider } from '../data-base/dataBase';


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
    'id' : '',
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
              public platform:Platform,
              public _db:DataBaseProvider) {
              }



  postLogin(user:string , pass:string)
  {


    //let headers = new HttpHeaders();
    //let data = new URLSearchParams();

    //headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');
    
    //data.append("email",user);
    //data.append("password",pass);

    //testing
    //this.body =  {'email':'hugo.colo@swift.com.ar' , 'password':'Hugocolo345*'};
   // this.body =  {'email':'ercesio@gmail.com' , 'password':'Cesio*8877'};

   this.body =  {'email':user, 'password':pass};

    let url = this.url + "/Account/Login"; 
    
    // promise
    return new Promise((resolve, reject)=>{
        this.http.post(url, this.body,this.httpOptions).subscribe(
          res=>
          {
            //guarda en DB
            this.storeUser(res).then(data => resolve(res));
          },(err)=>{reject(err);})
    });

  }

  isActive()
  {
    let token ;

    if(this.platform.is('cordova'))
    {
      this.storage.get('user').then((val) => 
      {
        if(val)
          token = val;
      });

    }else{
        token = JSON.parse(localStorage.getItem('user'));
    }


    if(token){
      return true;
    } else {
      return false;
    }
  

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

    console.log(this.tk);
    return this.tk;
  }
  
  logout()
  {
    if(this.platform.is('cordova'))
      {
        this.storage.remove('user');
      }else{
        localStorage.removeItem('user');
      } 

    let sql = 'DELETE from users';
    this._db.db.executeSql(sql);

    // let sql1 = 'DELETE from encuentros';
    // this._db.db.executeSql(sql1);
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

    // let sql = 'SELECT * FROM users';

    // return this._db.db.executeSql(sql)
    //         .then(response => {
    //           let user = [];
    //           for (let index = 0; index < response.rows.length; index++) {
    //             user.push( response.rows.item(index) );
    //           }
    //          // console.table(user[0].token);
    //           return Promise.resolve( user );
    //         })
    //         .catch(error => Promise.reject(error));

  }


  //save user in db
  storeUser(res)
  {
    let sql = 'INSERT INTO users(user_id , token, club, expiration, username) VALUES(?,?,?,?,?)';
    return this._db.db.executeSql( sql ,[res.id ,res.token, res.club.nombre, res.expiration]);
  }
  
}
