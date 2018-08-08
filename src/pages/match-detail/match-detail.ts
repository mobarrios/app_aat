import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/data-base/dataBase';
import { EncuentrosService } from '../../providers/encuentros/encuentros';
import { UtilsService } from '../../providers/utils/utils';

/**
 * Generated class for the MatchDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-detail',
  templateUrl: 'match-detail.html',
})
export class MatchDetailPage {

  public encuentroId:any;
  public resultsId;
  public comentarios;
  public confirm:boolean;

  public local_id;
  public visita_id;
  public local_nombre;
  public visita_nombre;
  public fecha; 
  public incidencias;

  public s1_loc_jug;
  public s1_loc_jug_n;
  public s1_vis_jug;
  public s1_vis_jug_n;
  public s1_sets;
  public s1_l_t_sets = 0;
  public s1_v_t_sets = 0;



  public s2_loc_jug;
  public s2_loc_jug_n;
  public s2_vis_jug;
  public s2_vis_jug_n;
  public s2_sets;
  public s2_l_t_sets = 0;
  public s2_v_t_sets = 0;



  public d1_loc_jug_1;
  public d1_loc_jug_1_n;
  public d1_loc_jug_2;
  public d1_loc_jug_2_n;
  public d1_vis_jug_1;
  public d1_vis_jug_1_n;
  public d1_vis_jug_2;
  public d1_vis_jug_2_n;
  public d1_sets;
  public d1_l_t_sets = 0;
  public d1_v_t_sets = 0;

  public total_local = 0;
  public total_visita = 0;

       public s1l1:string;
       public s1v1:string;
       public s1l2:string;
       public s1v2:string;
       public s1l3:string;
       public s1v3:string;

       public s2l1:string;
       public s2v1:string;
       public s2l2:string;
       public s2v2:string;
       public s2l3:string;
       public s2v3:string;

       public d1l1:string;
       public d1v1:string;
       public d1l2:string;
       public d1v2:string;
       public d1l3:string;
       public d1v3:string;
  

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public _db:DataBaseProvider,
                public _es:EncuentrosService,
                public _ut:UtilsService) {

    this.encuentroId = navParams.get('encuentrosId');
    this.getData();
  }


  getData()
  { 

     this._db.db.executeSql('SELECT * FROM encuentros WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{
        for (let i = 0; i < res.rows.length; i++) 
        {
                let data = res.rows.item(i);
              //console.log(res.rows.item(i).jugador_id); 
              this.local_id = data.equipo_local_id;
              this.visita_id = data.equipo_visita_id;
              this.local_nombre = data.club_local_nombre;
              this.visita_nombre = data.club_visita_nombre;
              this.fecha = data.fecha;
              this.incidencias = data.incidencias;
              this.comentarios = data.confirmacion_comentario;
              this.resultsId = data.resultados_id;
              this.confirm = data.confirmacion;
        }
      });

     this._db.db.executeSql('SELECT * FROM encuentros_resultados WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{

      for (let i = 0; i < res.rows.length; i++) 
      {
        let data = res.rows.item(i);
            //console.log(res.rows.item(i).jugador_id); 
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '1')
                this.s1l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '1')
                this.s1v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '2')
                this.s1l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '2')
                this.s1v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '3')
                this.s1l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '3')
                this.s1v3 = data.puntos;
  
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '1')
                this.s2l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '1')
                this.s2v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '2')
                this.s2l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '2')
                this.s2v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '3')
                this.s2l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '3')
                this.s2v3 = data.puntos;

            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '1')
                this.d1l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '1')
                this.d1v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '2')
                this.d1l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '2')
                this.d1v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '3')
                this.d1l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '3')
                this.d1v3 = data.puntos;

      }

      this.s1_sets =  this.s1l1+''+ this.s1v1+''+ this.s1l2+''+ this.s1v2+''+ this.s1l3+''+ this.s1v3;
      this.s2_sets =  this.s2l1+''+ this.s2v1+''+ this.s2l2+''+ this.s2v2+''+ this.s2l3+''+ this.s2v3;
      this.d1_sets =  this.d1l1+''+ this.d1v1+''+ this.d1l2+''+ this.d1v2+''+ this.d1l3+''+ this.d1v3;

      //sets totales S1
        if( this.s1l1 >  this.s1v1)
            this.s1_l_t_sets += 1;
        else if( this.s1l1 <  this.s1v1)
            this.s1_v_t_sets += 1;

        if( this.s1l2 >  this.s1v2)
            this.s1_l_t_sets += 1;
        else if( this.s1l2 <  this.s1v2)
            this.s1_v_t_sets += 1;

        if( this.s1l3 >  this.s1v3)
            this.s1_l_t_sets += 1;
        else if( this.s1l3 <  this.s1v3)
            this.s1_v_t_sets += 1;

        //sets totales S2
        if( this.s2l1 >  this.s2v1)
            this.s2_l_t_sets += 1;
        else if( this.s2l1 <  this.s2v1)
            this.s2_v_t_sets += 1;

        if( this.s2l2 >  this.s2v2)
            this.s2_l_t_sets += 1;
        else if( this.s2l2 <  this.s2v2)
            this.s2_v_t_sets += 1;

        if( this.s2l3 >  this.s2v3)
            this.s2_l_t_sets += 1;
        else if( this.s2l3 <  this.s2v3)
            this.s2_v_t_sets += 1;

            
        //sets totales D1
        if( this.d1l1 >  this.d1v1)
            this.d1_l_t_sets += 1;
        else if( this.d1l1 <  this.d1v1)
            this.d1_v_t_sets += 1;

        if( this.d1l2 >  this.d1v2)
            this.d1_l_t_sets += 1;
        else if( this.d1l2 <  this.d1v2)
            this.d1_v_t_sets += 1;

        if( this.d1l3 >  this.d1v3)
            this.d1_l_t_sets += 1;
        else if( this.d1l3 <  this.d1v3)
            this.d1_v_t_sets += 1;


        //total encuentro
      
        if(this.s1_l_t_sets > this.s1_v_t_sets)
            this.total_local += 1;
        else
            this.total_visita += 1;

        if(this.s2_l_t_sets > this.s2_v_t_sets)
            this.total_local += 1;
        else
            this.total_visita += 1;

        if(this.d1_l_t_sets > this.d1_v_t_sets)
            this.total_local += 1;
        else
            this.total_visita += 1;
       

      });

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{
        for (let i = 0; i < res.rows.length; i++) 
        {
          let data = res.rows.item(i);
          
              //console.log(res.rows.item(i).jugador_id); 
              if(data.lv == 'l' && data.partido == 'S1')
              {
                  this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.s1_loc_jug = r.rows.item(0).id_jugador;
                  });
                this.s1_loc_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'S1')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.s1_vis_jug = r.rows.item(0).id_jugador;
                  });
                this.s1_vis_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'S2')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.s2_loc_jug = r.rows.item(0).id_jugador;
                  });
                this.s2_loc_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'S2')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.s2_vis_jug = r.rows.item(0).id_jugador;
                  });
                this.s2_vis_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'D1')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.d1_loc_jug_1 = r.rows.item(0).id_jugador;
                  });
                this.d1_loc_jug_1_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'D2')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.d1_loc_jug_2 = r.rows.item(0).id_jugador;
                  });
                this.d1_loc_jug_2_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'D1')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.d1_vis_jug_1 = r.rows.item(0).id_jugador;
                  });
                this.d1_vis_jug_1_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'D2')
              {
                this._db.db.executeSql('SELECT * FROM jugadores where id = ?',[data.jugador_id_store]).then(r=>{
                    this.d1_vis_jug_2 = r.rows.item(0).id_jugador;
                  });
                this.d1_vis_jug_2_n = data.jugador_nombre;
              }
          }
        });

  }

  sendData()
  {

    let data =  {
      'encuentroId':this.encuentroId,
      'partidos':[
        {
          'tipo':'S1',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.s1_loc_jug,
          'jugadorIdLocal2' : 0,
          'jugadorIdVisita1' : this.s1_vis_jug,
          'jugadorIdVisita2' : 0,
          'sets': this.s1_sets,
          "incidente": this.incidencias,
          "jugadoresAdicionales": [
            {
                "id": 0,
                "equipoId": this.local_id,
                "numeroDocumento": 12345678,
                "nombre": "Leandrito"
            }
        ]
        },
        {
          'tipo':'S2',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.s2_loc_jug,
          'jugadorIdLocal2' : 0,
          'jugadorIdVisita1' : this.s2_vis_jug,
          'jugadorIdVisita2' : 0,
          'sets':this.s2_sets,
          "incidente": this.incidencias
        },
        {
          'tipo':'D1',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.d1_loc_jug_1,
          'jugadorIdLocal2' : this.d1_loc_jug_2,
          'jugadorIdVisita1' : this.d1_vis_jug_1,
          'jugadorIdVisita2' : this.d1_vis_jug_2,
          'sets': this.d1_sets,
          "incidente": this.incidencias
        }
      ]
    };

     this._es.postEncuentrosResultados(data).then(res=>{
        
        this._db.db.executeSql('UPDATE encuentros SET resultados_id=? WHERE encuentro_id=?',[ res['id'], this.encuentroId ]);
        this.resultsId = res['id'] ;
        this._ut.showMessages('Mensaje','Resultado Enviado Correctamente.',true);

     },(err)=>{
       console.log(err);
     });
    
  }

  sendConfirmacion(confirma:boolean)
  {
    this._es.postConfirmacion(this.resultsId,confirma,this.comentarios).then(res=>{
        this._db.db.executeSql('UPDATE encuentros SET confirmacion=?, confirmacion_comentario=? WHERE encuentro_id=?',[confirma, this.comentarios , this.encuentroId ]);
        this._ut.showMessages("Mensaje","Confirmación enviada.",true);
    });
  }

 

  
}
