import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';




/*
  Generated class for the EncuentrosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EncuentrosService {

  url:string = 'http://interclubes-aat-api.sysmo.com.ar/api';
  token:any;
 
  constructor(public http: HttpClient,
              public _us:UsersService,
              public platform:Platform,
              public storage:Storage
             ) {
    }

  


  getEncuentro(id:number){
  
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/encuentro/'+ id;

    // this.http.get(url, httpOptions).subscribe(data => { 
    //       this.resp1.push(data);
    //       this.equipoLocal = data['equipoLocal'];
    //       this.equipoVisitante = data['equipoVisitante'];
    //     });  

    return this.http.get(url, httpOptions);
  }

  getBuenFe(equipoId:number){
  
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/equipo/'+ equipoId +'/listabuenafe';
    return this.http.get(url, httpOptions); 
  }

  getEncuentros()
  {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/encuentro';

    return new Promise((resolve, reject)=> {
      this.http.get(url,httpOptions).subscribe(
        res=>{resolve(res);
      },
        (err)=>{reject(err);
      })
  });

    //return this.http.get(url, httpOptions);
  }


  // cargaResultado
  postResultado()
  {
    
  }


  //get Store Data
  getEncuentrosLocalData(id:any)
  {
    let data:Encuentro ;

    if(this.platform.is('cordova'))
    {
      this.storage.get(id).then((val) => {
          data = val;
      });

    }else{
       data = JSON.parse(localStorage.getItem(id));  
    }

    return data;
    
  }





    //buena fe

  // getBuenaFe(id:number){
    
  //   const httpOptions = {
  //   headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer '+ this.getToken()
  //     })
  //   };

  //   let url = this.url + '/equipo/'+ id +'/ListaBuenaFe';

  //   this.http.get(url, httpOptions).subscribe(data => { 
  //         this.bf.push(data);
  //         console.log(data);
  //        });

  // }

  // Enceuntros
  
}
export interface Encuentro { 
     id: string;
     jugadorLocalSingle1:string;
     jugadorVisitaSingle1:string;
     jugadorLocalSingle2:string;
     jugadorVisitaSingle2:string;
     jugadorLocal1Doble:string;
     jugadorLocal2Doble:string;
     jugadorVisita1Doble:string;
     jugadorVisita2Doble:string;
     ls1_1:any;
     ls1_2:any;
     ls1_3:any;
     vs1_1:any;
     vs1_2:any;
     vs1_3:any;
     ls2_1:any;
     ls2_2:any;
     ls2_3:any;
     vs2_1:any;
     vs2_2:any;
     vs2_3:any;
     ld_1:any;
     ld_2:any;
     ld_3:any;
     vd_1:any;
     vd_2:any;
     vd_3:any;
     
}