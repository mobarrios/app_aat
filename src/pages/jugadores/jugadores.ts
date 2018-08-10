import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { EncuentrosService, Encuentro } from '../../providers/encuentros/encuentros';

import { Storage } from '@ionic/storage';
import { UtilsService } from '../../providers/utils/utils';
import { DataBaseProvider } from '../../providers/data-base/dataBase';
import { NuevoJugadorPage } from '../nuevo-jugador/nuevo-jugador';


/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jugadores',
  templateUrl: 'jugadores.html',
})
export class JugadoresPage {

  public enc:Encuentro;

  public encuentroId:any ;
  public local:any;
  public visita:any;
  public localNombre:any;
  public visitaNombre:any;
  public bfLocal:any =[];
  public bfVisita:any =[];

  public singles1local1;
  public singles1local2;
  public singles1visita1;
  public singles1visita2;

  public singles2local1;
  public singles2local2;
  public singles2visita1;
  public singles2visita2;

  public dobleslocal1;
  public dobleslocal2;
  public doblesvisita1;
  public doblesvisita2;

  public p1_tipo ;
  public p2_tipo ;
  public p3_tipo ;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _es:EncuentrosService,
              public _utils:UtilsService,
              public storage:Storage,
              public platform : Platform,
              public _db:DataBaseProvider,
              public modalCt:ModalController,
            ){

      this.encuentroId = navParams.get('encuentrosId');
      this.getData();
   }



   getData()
   { 

    // local storage
    // if(this.platform.is('cordova'))
    //   {
    //     this.storage.get(this.encuentroId).then((val) => {
    //        this.enc = val;
    //     });

    //   }else{
    //        this.enc = JSON.parse(localStorage.getItem(this.encuentroId));  
    //   }


      this._db.db.executeSql('SELECT * FROM encuentros_jugadores WHERE encuentro_id = ?',[this.encuentroId]).then(res=>
        {
        for (let i = 0; i < res.rows.length; i++) {
          let data = res.rows.item(i);
          
          // partido 1 local
          if(data.lv == 'l' && data.partido == 'p11')
              this.singles1local1 = data.jugador_nombre;
          if(data.lv == 'l' && data.partido == 'p12')
              this.singles1local2 = data.jugador_nombre;
          //partido 1 visita
          if(data.lv == 'v' && data.partido == 'p11')
            this.singles1visita1 = data.jugador_nombre;
          if(data.lv == 'v' && data.partido == 'p12')
            this.singles1visita2 = data.jugador_nombre;

          // partido 2 local
          if(data.lv == 'l' && data.partido == 'p21')
              this.singles2local1 = data.jugador_nombre;
          if(data.lv == 'l' && data.partido == 'p22')
              this.singles2local2 = data.jugador_nombre;

          //partido 2 visita
          if(data.lv == 'v' && data.partido == 'p21')
            this.singles2visita1 = data.jugador_nombre;
          if(data.lv == 'v' && data.partido == 'p22')
            this.singles2visita2 = data.jugador_nombre;

          //partido 3 local
          if(data.lv == 'l' && data.partido == 'p31')
            this.dobleslocal1 = data.jugador_nombre; 
          if(data.lv == 'l' && data.partido == 'p32')
            this.dobleslocal2 = data.jugador_nombre;

          //partido 3 visita
          if(data.lv == 'v' && data.partido == 'p31')
            this.doblesvisita1 = data.jugador_nombre;
          if(data.lv == 'v' && data.partido == 'p32')
            this.doblesvisita2 = data.jugador_nombre;          
        }
      });

      this._es.getEncuntroStore(this.encuentroId).then(res=>{
          let data = res.rows.item(0);
          this.localNombre = data.club_local_nombre;
          this.visitaNombre = data.club_visita_nombre;
          this.local = data.equipo_local_id;
          this.visita = data.equipo_visita_id;
          this.p1_tipo = data.p1_tipo;
          this.p2_tipo = data.p2_tipo;
          this.p3_tipo = data.p3_tipo;
      });


      // if(this.enc)
      //   {
      //     this.singles1local = this.enc.jugadorLocalSingle1;
      //     this.singles1visita = this.enc.jugadorVisitaSingle1;
      //     this.singles2local = this.enc.jugadorLocalSingle2;
      //     this.singles2visita = this.enc.jugadorVisitaSingle2;
      //     this.dobleslocal1 = this.enc.jugadorLocal1Doble;
      //     this.dobleslocal2 = this.enc.jugadorLocal2Doble;
      //     this.doblesvisita1 = this.enc.jugadorVisita1Doble;
      //     this.doblesvisita2 = this.enc.jugadorVisita2Doble;      
      //   }
  



    //  this._es.getEncuentro(this.encuentroId).subscribe(data => {
    //    this._utils.showMessages('Sincronizando Lista de Buena Fé..')
        
    //     this.local = data['equipoLocal']['id'];
    //     this.visita = data['equipoVisitante']['id'];
    //     this.localNombre = data['equipoLocal']['club']['nombre'];
    //     this.visitaNombre = data['equipoVisitante']['club']['nombre'];
    //     //this.getBfLocal();
    //     //this.getBfVisita();
    //     this._utils.dismissMessages();
    //   });


   }

  //  getBfLocal()
  //  {
  //     this._es.getBuenFe(this.local).subscribe( data =>{
  //       this.bfLocal = data;
  //     });
  //  }
  //  getBfVisita()
  //  {
  //     this._es.getBuenFe(this.visita).subscribe( data =>{
  //       this.bfVisita = data;
  //     });
  //  }


   //envia data de jugadores
  //  sendPlayers(){

  //   if(this.singles1local1 == this.singles2local)
  //     this._utils.showMessages('Alerta','El Jugador del Equipo Local, Single 1, no puede ser el mismo que el Single2',true);
     
  //   if(this.singles1visita == this.singles2visita)
  //     this._utils.showMessages('Alerta','El Jugador del Equipo Visitante, Single 1, no puede ser el mismo que el Single2',true);
      

  //   this._utils.showLoading('Guardando...');

  //   // let enc = {
  //   //   'id': this.encuentroId , 
  //   //   'jugadorLocalSingle1' : this.singles1local,
  //   //   'jugadorVisitaSingle1' : this.singles1visita,
  //   //   'jugadorLocalSingle2' : this.singles2local,
  //   //   'jugadorVisitaSingle2' : this.singles2visita,
  //   //   'jugadorLocal1Doble' : this.dobleslocal1,
  //   //   'jugadorLocal2Doble' : this.dobleslocal2,
  //   //   'jugadorVisita1Doble' : this.doblesvisita1,
  //   //   'jugadorVisita2Doble' : this.doblesvisita2,      
  //   // };

  //     if(this.platform.is('cordova'))
  //     {
  //             this.storage.set(this.encuentroId, this.enc);
  //     }else{
  //             localStorage.setItem(this.encuentroId, JSON.stringify(this.enc));  
  //     }


  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'S1' ]).then(res => {
        
  //       if(res.rows.length == 0 && this.singles1local != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'l','S1',this.singles1local]);
  //       } 
  //       //   else
  //       // {
  //       //   let sql1 = 'UPDATE encuentros SET jugador_id=? WHERE id=?';
  //       //   this._db.db.executeSql(sql1, [ this.singles1local, 1]);
  //       // }
  
  //     });     


  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'S1' ]).then(res => {
  //       if(res.rows.length == 0 && this.singles1visita != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'v','S1',this.singles1visita]);
  //       } 
  //     });   
      
  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'S2' ]).then(res => {
  //       if(res.rows.length == 0 && this.singles2local != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'l','S2',this.singles2local]);
  //       } 
  //     });     

  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'S2' ]).then(res => {
  //       if(res.rows.length == 0  && this.singles2visita != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'v','S2',this.singles2visita]);
  //       } 
  //     });   

  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'D1' ]).then(res => {
  //       if(res.rows.length == 0  && this.dobleslocal1 != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'l','D1',this.dobleslocal1]);
  //       } 
  //     });   

  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'D2' ]).then(res => {
  //       if(res.rows.length == 0  && this.dobleslocal2 != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'l','D2',this.dobleslocal2]);
  //       } 
  //     });   

  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'D1' ]).then(res => {
  //       if(res.rows.length == 0  && this.doblesvisita1 != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'v','D1',this.doblesvisita1]);
  //       } 
  //     });   

  //     this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'D2' ]).then(res => {
  //       if(res.rows.length == 0  && this.doblesvisita2 != null)
  //       {
  //         let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
  //         this._db.db.executeSql(sql, [ this.encuentroId, 'v','D2',this.doblesvisita2]);
  //       } 
  //     });   


  //     // this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ?', [this.encuentroId]).then(res => {
        
  //     //   for (let i = 0; i < res.rows.length; i++) {
  //     //     this._es.getJugadoresData(res.rows.item(i).jugador_id,);
  //     //   }

  //     // });

  //     this.navCtrl.pop();
  //  }

   agregarJugador(lv, partido, equipoId)
   {
     let modal = this.modalCt.create(NuevoJugadorPage,{'encuentroId':this.encuentroId,'lv':lv,'partido':partido,'equipoId':equipoId});
      modal.onDidDismiss(data=>{
        this.getData();
      });
      modal.present();
   }


   //cambia el tipo de partido
   cambiaTipo(tipo:any,partido:any)
   {
    console.log(tipo, partido);
    if(partido == 'p1') 
      this._db.db.executeSql('UPDATE encuentros set p1_tipo = ? WHERE encuentro_id = ?',[ tipo,this.encuentroId]);

    if(partido == 'p2') 
      this._db.db.executeSql('UPDATE encuentros set p2_tipo = ? WHERE encuentro_id = ?',[tipo, this.encuentroId]);

    if(partido == 'p3') 
      this._db.db.executeSql('UPDATE encuentros set p3_tipo = ? WHERE encuentro_id = ?',[tipo, this.encuentroId]);
   }

  }


  


