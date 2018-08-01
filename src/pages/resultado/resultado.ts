import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EncuentrosService, Encuentro } from '../../providers/encuentros/encuentros';
import { UtilsService } from '../../providers/utils/utils';

import { Storage } from '@ionic/storage';
import { DataBaseProvider } from '../../providers/data-base/dataBase';

/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  public localNombre:any;
  public localId:any;
  public visitaNombre:any;
  public visitaId:any;
  public encuentroId:any ;

  public enc:Encuentro;

  public ls1_j1;
  public vs1_j1;
  public ls2_j1;
  public vs2_j1;
  public ld1_j1;
  public ld1_j2;
  public vd1_j1;
  public vd1_j2;
  
  public ls1_1:any = 0;
  public ls1_2:any = 0;
  public ls1_3:any = 0;

  public vs1_1:any = 0;
  public vs1_2:any = 0;
  public vs1_3:any = 0;

  public ls2_1:any = 0;
  public ls2_2:any = 0;
  public ls2_3:any = 0;

  public vs2_1:any = 0;
  public vs2_2:any = 0;
  public vs2_3:any = 0;

  public ld_1:any = 0;
  public ld_2:any = 0;
  public ld_3:any = 0;

  public vd_1:any = 0;
  public vd_2:any = 0;
  public vd_3:any = 0;



  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public platform : Platform,
      public _es:EncuentrosService,
      public _us:UtilsService,
      public storage:Storage,
      public _db:DataBaseProvider)
   {
    this.encuentroId = navParams.get('encuentrosId');
    
    this.getData();

  }

  sendPlayers()
  {
   
    // this._es.postEncuentrosResultados().then(result=>{
    //   console.log(result);
    // },(err)=>{
    //   console.log(err);
    // });



    // let data:any = [{
    //   'id': this.encuentroId , 
    //     'ls1_1':this.ls1_1,
    //     'ls1_2':this.ls1_2,
    //     'ls1_3':this.ls1_3,

    //     'vs1_1':this.vs1_1,
    //     'vs1_2':this.vs1_2,
    //     'vs1_3':this.vs1_3,

    //     'ls2_1':this.ls2_1,
    //     'ls2_2':this.ls2_2,
    //     'ls2_3':this.ls2_3,

    //     'vs2_1':this.vs2_1,
    //     'vs2_2':this.vs2_2,
    //     'vs2_3':this.vs2_3,

    //     'ld_1':this.ld_1,
    //     'ld_2':this.ld_2,
    //     'ld_3':this.ld_3,

    //     'vd_1':this.vd_1,
    //     'vd_2':this.vd_2,
    //     'vd_3':this.vd_3,
    // }];

    // if(this.platform.is('cordova'))
    //   {
    //           this.storage.set(this.encuentroId, this.enc);
    //   }else{
    //           localStorage.setItem(this.encuentroId, JSON.stringify(this.enc));  
    //   }
    

    //SINGLE 1 LOCAL
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S1','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S1','1', this.ls1_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S1','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S1','2', this.ls1_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S1','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S1','3', this.ls1_3]);
    });  

    // SINGLE 1 VISITA
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S1','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S1','1', this.vs1_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S1','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S1','2', this.vs1_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S1','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S1','3', this.vs1_3]);
    });  

    // SINGLE 2 LOCAL
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S2','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S2','1', this.ls2_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S2','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S2','2', this.ls2_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'S2','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','S2','3', this.ls2_3]);
    });  


    // SINGLE 2 VISITA
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S2','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S2','1', this.vs2_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S2','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S2','2', this.vs2_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'S2','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','S2','3', this.vs2_3]);
    });  


    // DOBLES LOCAL
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'D1','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','D1','1', this.ld_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'D1','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','D1','2', this.ld_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'l', 'D1','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'l','D1','3', this.ld_3]);
    });  

    // DOBLES VISITA
    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'D1','1' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','D1','1', this.vd_1]);
    });  

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'D1','2' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','D1','2', this.vd_2]);
    });   

    this._db.db.executeSql('SELECT * FROM encuentros_resultados where encuentro_id = ? AND lv = ? AND partido = ? AND n_set = ?',[ this.encuentroId, 'v', 'D1','3' ]).then(res => {
      if(res.rows.length == 0)
         this._db.db.executeSql('INSERT INTO encuentros_resultados(encuentro_id,lv,partido,n_set,puntos) VALUES(?,?,?,?,?)', [ this.encuentroId, 'v','D1','3', this.vd_3]);
    });  

      
    this._us.showLoading('Guardando Datos');
    this.navCtrl.pop();
  }

  getData()
   { 
    //    this._es.getEncuentro(this.encuentroId).subscribe(res => {
    //        console.table(res);
    //    this.localNombre   = 'dposkdpoaskpo' + res['equipoLocal']['club']['nombre'];
    //    this.visitaNombre  = res['equipoVisitante']['club']['nombre'];
    //    this.localId       = res['equipoLocal']['club']['id'];
    //    this.visitaId      = res['equipoVisitante']['club']['id'];
    //   });

      this._es.getEncuntroStore(this.encuentroId).then(res => {
        let data = res.rows.item(0);
        this.localNombre = data.club_local_nombre;
        this.visitaNombre = data.club_visita_nombre;
        this.localId = data.club_local_id;
        this.visitaId = data.club_visita_id;
      });


      this._db.db.executeSql('SELECT * FROM encuentros_resultados WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{
        for (let i = 0; i < res.rows.length; i++) {
          let data = res.rows.item(i);
          
          if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '1')
              this.ls1_1 = data.puntos;
          if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '2')
              this.ls1_2 = data.puntos;
          if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '3')
              this.ls1_3 = data.puntos;

          if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '1')
              this.vs1_1 = data.puntos;
          if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '2')
              this.vs1_2 = data.puntos;
          if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '3')
              this.vs1_3 = data.puntos;


          if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '1')
              this.ls2_1 = data.puntos;
          if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '2')
              this.ls2_2 = data.puntos;
          if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '3')
              this.ls2_3 = data.puntos;

          if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '1')
              this.vs2_1 = data.puntos;
          if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '2')
              this.vs2_2 = data.puntos;
          if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '3')
              this.vs2_3 = data.puntos;

          if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '1')
              this.ld_1 = data.puntos;
          if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '2')
              this.ld_2 = data.puntos;
          if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '3')
              this.ld_3 = data.puntos;

          if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '1')
              this.vd_1 = data.puntos;
          if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '2')
              this.vd_2 = data.puntos;
          if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '3')
              this.vd_3 = data.puntos;

              //console.log(res.rows.item(i).jugador_id);
        }
      });


      this._db.db.executeSql('SELECT * FROM encuentros_jugadores WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{
        
        for (let i = 0; i < res.rows.length; i++) 
        {
          let data = res.rows.item(i);

          if(data.lv == 'l')
                 this._es.getJugadoresData( data.jugador_id , this.localId).then(res => {
                 this._db.db.executeSql('UPDATE encuentros_jugadores SET jugador_nombre=? WHERE id=?', [res['nombre'], data.id]);
                 if(data.partido == 'S1')
                        this.ls1_j1 = res['nombre'];
                 if(data.partido == 'S2')
                        this.ls2_j1 = res['nombre'];
                 if(data.partido == 'D1')
                        this.ld1_j1 = res['nombre'];
                 if(data.partido == 'D2')
                        this.ld1_j2 = res['nombre'];
                });

            if(data.lv == 'v')
                this._es.getJugadoresData( data.jugador_id , this.visitaId).then(res => {
                this._db.db.executeSql('UPDATE encuentros_jugadores SET jugador_nombre=? WHERE id=?', [res['nombre'], data.id]);
                if(data.partido == 'S1')
                        this.vs1_j1 = res['nombre'];
                 if(data.partido == 'S2')
                        this.vs2_j1 = res['nombre'];
                 if(data.partido == 'D1')
                        this.vd1_j1 = res['nombre'];
                 if(data.partido == 'D2')
                        this.vd1_j2 = res['nombre'];
            });
          
        }
      });




    this.enc = this._es.getEncuentrosLocalData(this.encuentroId);

   }
 

}
