import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users';


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
             public _us:UsersService) {
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
