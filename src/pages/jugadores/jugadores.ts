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

  public singles1local;
  public singles1visita;
  public singles2local;
  public singles2visita;
  public dobleslocal1;
  public dobleslocal2;
  public doblesvisita1;
  public doblesvisita2;



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
          
          if(data.lv == 'l' && data.partido == 'S1')
              this.singles1local = data.jugador_nombre;

          if(data.lv == 'v' && data.partido == 'S1')
            this.singles1visita = data.jugador_nombre;

          if(data.lv == 'l' && data.partido == 'S2')
              this.singles2local = data.jugador_nombre;

          if(data.lv == 'v' && data.partido == 'S2')
            this.singles2visita = data.jugador_nombre;

          //dobles
          if(data.lv == 'l' && data.partido == 'D1')
            this.dobleslocal1 = data.jugador_nombre;
          
          if(data.lv == 'l' && data.partido == 'D2')
            this.dobleslocal2 = data.jugador_nombre;

          if(data.lv == 'v' && data.partido == 'D1')
            this.doblesvisita1 = data.jugador_nombre;
          
          if(data.lv == 'v' && data.partido == 'D2')
            this.doblesvisita2 = data.jugador_nombre;

              //console.log(res.rows.item(i).jugador_id);
          
        }
      });

      this._es.getEncuntroStore(this.encuentroId).then(res=>{
          let data = res.rows.item(0);
          this.localNombre = data.club_local_nombre;
          this.visitaNombre = data.club_visita_nombre;
          this.local = data.equipo_local_id;
          this.visita = data.equipo_visita_id;
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
   sendPlayers(){

    if(this.singles1local == this.singles2local)
      this._utils.showMessages('Alerta','El Jugador del Equipo Local, Single 1, no puede ser el mismo que el Single2',true);
     
    if(this.singles1visita == this.singles2visita)
      this._utils.showMessages('Alerta','El Jugador del Equipo Visitante, Single 1, no puede ser el mismo que el Single2',true);
      

    this._utils.showLoading('Guardando...');

    // let enc = {
    //   'id': this.encuentroId , 
    //   'jugadorLocalSingle1' : this.singles1local,
    //   'jugadorVisitaSingle1' : this.singles1visita,
    //   'jugadorLocalSingle2' : this.singles2local,
    //   'jugadorVisitaSingle2' : this.singles2visita,
    //   'jugadorLocal1Doble' : this.dobleslocal1,
    //   'jugadorLocal2Doble' : this.dobleslocal2,
    //   'jugadorVisita1Doble' : this.doblesvisita1,
    //   'jugadorVisita2Doble' : this.doblesvisita2,      
    // };

      if(this.platform.is('cordova'))
      {
              this.storage.set(this.encuentroId, this.enc);
      }else{
              localStorage.setItem(this.encuentroId, JSON.stringify(this.enc));  
      }


      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'S1' ]).then(res => {
        
        if(res.rows.length == 0 && this.singles1local != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'l','S1',this.singles1local]);
        } 
        //   else
        // {
        //   let sql1 = 'UPDATE encuentros SET jugador_id=? WHERE id=?';
        //   this._db.db.executeSql(sql1, [ this.singles1local, 1]);
        // }
  
      });     


      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'S1' ]).then(res => {
        if(res.rows.length == 0 && this.singles1visita != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'v','S1',this.singles1visita]);
        } 
      });   
      
      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'S2' ]).then(res => {
        if(res.rows.length == 0 && this.singles2local != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'l','S2',this.singles2local]);
        } 
      });     

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'S2' ]).then(res => {
        if(res.rows.length == 0  && this.singles2visita != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'v','S2',this.singles2visita]);
        } 
      });   

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'D1' ]).then(res => {
        if(res.rows.length == 0  && this.dobleslocal1 != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'l','D1',this.dobleslocal1]);
        } 
      });   

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'l', 'D2' ]).then(res => {
        if(res.rows.length == 0  && this.dobleslocal2 != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'l','D2',this.dobleslocal2]);
        } 
      });   

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'D1' ]).then(res => {
        if(res.rows.length == 0  && this.doblesvisita1 != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'v','D1',this.doblesvisita1]);
        } 
      });   

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ? AND lv = ? AND partido = ?',[ this.encuentroId, 'v', 'D2' ]).then(res => {
        if(res.rows.length == 0  && this.doblesvisita2 != null)
        {
          let sql = 'INSERT INTO encuentros_jugadores(encuentro_id,lv,partido,jugador_id) VALUES(?,?,?,?)';
          this._db.db.executeSql(sql, [ this.encuentroId, 'v','D2',this.doblesvisita2]);
        } 
      });   


      // this._db.db.executeSql('SELECT * FROM encuentros_jugadores where encuentro_id = ?', [this.encuentroId]).then(res => {
        
      //   for (let i = 0; i < res.rows.length; i++) {
      //     this._es.getJugadoresData(res.rows.item(i).jugador_id,);
      //   }

      // });

      this.navCtrl.pop();
   }

   agregarJugador(lv, partido, equipoId)
   {
     let modal = this.modalCt.create(NuevoJugadorPage,{'encuentroId':this.encuentroId,'lv':lv,'partido':partido,'equipoId':equipoId});
      modal.onDidDismiss(data=>{
        this.getData();
      });
      modal.present();
   }
  }


  


