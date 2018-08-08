import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    return this.http.get(url, httpOptions);
  }

  getBuenFe(equipoId:string, encuentroId:any){
  
    let params = new HttpParams();
    params.append('encuentroId',encuentroId);
    params.append('equipoaId',equipoId);


    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };

    

    //let body = {'encuentroId': encuentroId, 'equipoId': equipoId};
    //let url = this.url + '/equipo/'+equipoId+'/listabuenafe';
    console.log(encuentroId);
    console.log(equipoId);

    let url = this.url + '/listabuenafe/'+encuentroId+'/'+equipoId;
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
    for (let index = 0; index < res.length; index++) 
    {

             this._db.db.executeSql('SELECT * FROM encuentros where encuentro_id = ?',  [res[index].id]).then(r=>{
      
              if(r.rows.length == 0)
              {
                let resId;
                if(res[index].resultados.length >= 1)
                    resId = res[index].resultados[0].id;

                let sql = 'INSERT INTO encuentros(user_id ,encuentro_id, equipo_local_id, equipo_visita_id, club_local_id, club_local_nombre, club_visita_id, club_visita_nombre, campeonato,categoria,division, fecha, resultados_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
                this._db.db.executeSql(sql, [ 
                  user,
                  res[index].id, 
                  res[index].equipoLocal.id ,
                  res[index].equipoVisitante.id ,
                  res[index].equipoLocal.club.id ,
                  res[index].equipoLocal.club.nombre ,
                  res[index].equipoVisitante.club.id,
                  res[index].equipoVisitante.club.nombre ,
                  res[index].campeonato.descripcion, 
                  res[index].categoria.descripcion, 
                  res[index].division.descripcion,
                  res[index].fecha,
                  resId ]);
              } 
            }); 
            
            
            this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ?',  [res[index].id]).then(r=>
              {
              if(r.rows.length == 0)
              {
                this.getEncuentro(res[index].id).subscribe(
                  res =>{
                      if(res[0].resultados.length != 0)
                      {
                          this.storeEncuentrosResultado(res[0]);
                      }
                });
              }
            }); 

            this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ?',  [res[index].id]).then(r=>
              {
              if(r.rows.length == 0)
              {
                this.getEncuentro(res[index].id).subscribe(
                  res =>
                  {
                      if(res[0].resultados.length != 0)
                      {
                          this.storeEncuentrosJugadores(res[0]);
                      }
                  });
              }
            }); 


        }
  }

  storeEncuentrosJugadores(res)
  {
    let data = res ;
    let resultados = res.resultados[0];
    let s1 = data.resultados[0].partidos[0];
    let s2 = data.resultados[0].partidos[1];
    let d1 = data.resultados[0].partidos[2];

    let s1LJId = s1.jugadorIdLocal1;
    let s1LJN = s1.jugadorNombreLocal1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[s1LJId]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[s1LJId,s1LJN]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S1',r.insertId,s1LJN]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S1',res.rows.item(0),s1LJN]);
      }
    });

    let s1VJId = s1.jugadorIdVisita1;
    let s1VJN = s1.jugadorNombreVisita1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[s1VJId]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[s1VJId,s1VJN]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S1',r.insertId,s1VJN]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S1',res.rows.item(0),s1VJN]);
      }
    });


    let s2LJId = s2.jugadorIdLocal1;
    let s2LJN = s2.jugadorNombreLocal1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[s2LJId]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[s2LJId,s2LJN]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S2',r.insertId,s2LJN]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S2',res.rows.item(0),s2LJN]);
      }
    });

    let s2VJId = s2.jugadorIdVisita1;
    let s2VJN = s2.jugadorNombreVisita1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[s2VJId]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[s2VJId,s2VJN]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S2',r.insertId,s2VJN]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S2',res.rows.item(0),s2VJN]);
      }
    });


    let d1LJ1Id = d1.jugadorIdLocal1;
    let d1LJ1N = d1.jugadorNombreLocal1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[d1LJ1Id]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[d1LJ1Id,d1LJ1N]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D1',r.insertId,d1LJ1N]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D1',res.rows.item(0),d1LJ1N]);
      }
    });

    let d1LJ2Id = d1.jugadorIdLocal2;
    let d1LJ2N = d1.jugadorNombreLocal2; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[d1LJ2Id]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[d1LJ2Id,d1LJ2N]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D2',r.insertId,d1LJ2N]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D2',res.rows.item(0),d1LJ2N]);
      }
    });


    let d1VJ1Id = d1.jugadorIdVisita1;
    let d1VJ1N = d1.jugadorNombreVisita1; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[d1VJ1Id]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[d1VJ1Id,d1VJ1N]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D1',r.insertId,d1VJ1N]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D1',res.rows.item(0),d1VJ1N]);
      }
    });

    let d1VJ2Id = d1.jugadorIdVisita2;
    let d1VJ2N = d1.jugadorNombreVisita2; 

    this._db.db.executeSql('SELECT * FROM jugadores WHERE id_jugador = ?',[d1VJ2Id]).then(res=>{
      if(res.rows.length == 0){
          this._db.db.executeSql('INSERT INTO jugadores(id_jugador , nombre) VALUES(?,?)',[d1VJ2Id,d1VJ2N]).then(r => {
          this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D2',r.insertId,d1VJ2N]);
          });
      }
      else{
        this._db.db.executeSql('INSERT INTO encuentros_jugadores(encuentro_id, lv, partido , jugador_id_store, jugador_nombre) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D2',res.rows.item(0),d1VJ2N]);
      }
    });
  }
  
  storeEncuentrosResultado(res)
  {
    let data = res ;
    let resultados = res.resultados[0];
    let s1 = data.resultados[0].partidos[0];
    let s2 = data.resultados[0].partidos[1];
    let d1 = data.resultados[0].partidos[2];

    let s1Set = s1.sets;
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S1','1',s1Set.charAt(0)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S1','1',s1Set.charAt(1)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S1','2',s1Set.charAt(2)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S1','2',s1Set.charAt(3)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S1','3',s1Set.charAt(4)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S1','3',s1Set.charAt(5)]);


    let s2Set = s2.sets;
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S2','1',s2Set.charAt(0)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S2','1',s2Set.charAt(1)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S2','2',s2Set.charAt(2)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S2','2',s2Set.charAt(3)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','S2','3',s2Set.charAt(4)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','S2','3',s2Set.charAt(5)]);


    let d1Set = d1.sets;
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D1','1',d1Set.charAt(0)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D1','1',d1Set.charAt(1)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D1','2',d1Set.charAt(2)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D1','2',d1Set.charAt(3)]);

    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'l','D1','3',d1Set.charAt(4)]);
    this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id, lv , partido , n_set, puntos) VALUES(?,?,?,?,?)',[resultados.encuentroId,'v','D1','3',d1Set.charAt(5)]);
        
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
    console.log(data)
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };
    let url = this.url + '/resultado';

    let body = data;

    return new Promise((resolve, reject)=>
    {
      this.http.post(url, body, httpOptions).subscribe(
        res =>{ resolve(res);
      },(err)=>{reject(err);})
  });


  }

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

  postConfirmacion(resId:any , confirma:boolean , obs:any)
  {
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer '+ this._us.getToken(),
          'Access-Control-Allow-Origin':'*',
        })
    };

    let url = this.url + '/resultado/'+resId+'/confirmacion';
    let body = {
      'confirma':confirma,
      'observaciones':obs,
    };

    return new Promise((resolve, reject)=> 
    {
      this.http.post(url, body, httpOptions).subscribe(
        res =>{ resolve(res);
      },(err)=>{reject(err);
      });
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