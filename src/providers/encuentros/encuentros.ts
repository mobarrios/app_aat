import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../users/users';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DataBaseProvider } from '../data-base/dataBase';
import { UtilsService } from '../utils/utils';

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
              public storage:Storage,
              public _db:DataBaseProvider,
              public _utils:UtilsService,
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
    console.log(equipoId);
    let url = this.url + '/equipo/'+equipoId+'/listabuenafe';
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
        res=>{
          this.storeEncuentros(res);
          resolve(res);
      },
        (err)=>{reject(err);
      })
  });

    //return this.http.get(url, httpOptions);
  }


  getEncuentrosStore()
  {
    let user = this._us.user.id;

    return this._db.db.executeSql('SELECT * FROM encuentros where user_id = ?',[user]).then(response => {
      return Promise.resolve( response );
    });
  }

  getEncuntroStore(id:any)
  {
    return this._db.db.executeSql('SELECT * FROM encuentros where encuentro_id = ?',[id]).then(response => {
      return Promise.resolve( response );
    });

  }

  storeEncuentros(res)
  {
    let user = this._us.user.id;


    for (let index = 0; index < res.length; index++) {
            // console.log(res[index].id);

             this._db.db.executeSql('SELECT * FROM encuentros where encuentro_id = ?',  [res[index].id]).then(r=>{
      
              if(r.rows.length == 0)
              {
                let sql = 'INSERT INTO encuentros(user_id ,encuentro_id, club_local_id, club_local_nombre, club_visita_id, club_visita_nombre, campeonato,categoria,division, fecha) VALUES(?,?,?,?,?,?,?,?,?,?)';
                this._db.db.executeSql(sql, [ 
                  user,
                  res[index].id, 
                  res[index].equipoLocal.club.id ,
                  res[index].equipoLocal.club.nombre ,
                  res[index].equipoVisitante.club.id,
                  res[index].equipoVisitante.club.nombre ,
                  res[index].campeonato.descripcion, 
                  res[index].categoria.descripcion, res[index].division.descripcion,
                  res[index].fecha]);
              } 
            });             
        }
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


  postEncuentrosResultados(data)
  {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/resultado';
  
    // let body =  {
    //               'encuentrosId':'417694',
    //               'partidos':[
    //                 {
    //                   'tipo':'S1',
    //                   "equipoIdLocal": 443,
    //                   "equipoIdVisita": 24,
    //                   'jugadorIdLocal1' : 1234,
    //                   'jugadorIdVisita1' : 3232,
    //                   'sets':'657282'
    //                 },
    //                 {
    //                   'tipo':'S2',
    //                   "equipoIdLocal": 443,
    //                   "equipoIdVisita": 24,
    //                   'jugadorIdLocal1' : 1234,
    //                   'jugadorIdVisita1' : 3232,
    //                   'sets':'657282'
    //                 },
    //                 {
    //                   'tipo':'D',
    //                   "equipoIdLocal": 443,
    //                   "equipoIdVisita": 24,
    //                   'jugadorIdLocal1' : 1234,
    //                   'jugadorIdLocal2' : 1234,
    //                   'jugadorIdVisita1' : 3232,
    //                   'jugadorIdVisita' : 3232,
    //                   'sets':'657282'
    //                 }
    //               ]

    //             };


    let body = {data};

    return new Promise((resolve, reject)=>
    {
      this.http.post(url, body, httpOptions).subscribe(
        res =>{ resolve(res);
      },(err)=>{reject(err);})
  });


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
  

  getJugadoresData(jugadorId:any ,clubId:any)
  {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/club/'+ clubId +'/jugador/'+ jugadorId;
   
    return new Promise((resolve, reject)=>
    {
      this.http.get(url, httpOptions).subscribe
      ( res=>{
        resolve(res);
      }, (err)=>{
        reject(err);})
    });

  }
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