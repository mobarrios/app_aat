import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/data-base/dataBase';
import { EncuentrosService } from '../../providers/encuentros/encuentros';

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

  public local_id;
  public visita_id;
  public local_nombre;
  public visita_nombre;
  public fecha; 

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
               public _db:DataBaseProvider,
              public _es:EncuentrosService) {

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
             this.local_id = data.club_local_id;
             this.visita_id = data.club_visita_id;
             this.local_nombre = data.club_local_nombre;
             this.visita_nombre = data.club_visita_nombre;
             this.fecha = data.fecha;
       }
     });

     this._db.db.executeSql('SELECT * FROM encuentros_resultados WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{

       let s1l1:string;
       let s1v1:string;
       let s1l2:string;
       let s1v2:string;
       let s1l3:string;
       let s1v3:string;

       let s2l1:string;
       let s2v1:string;
       let s2l2:string;
       let s2v2:string;
       let s2l3:string;
       let s2v3:string;

       let d1l1:string;
       let d1v1:string;
       let d1l2:string;
       let d1v2:string;
       let d1l3:string;
       let d1v3:string;
      

      for (let i = 0; i < res.rows.length; i++) 
      {
        let data = res.rows.item(i);
            //console.log(res.rows.item(i).jugador_id); 
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '1')
                s1l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '1')
                s1v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '2')
                s1l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '2')
                s1v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S1' && data.n_set == '3')
                s1l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S1' && data.n_set == '3')
                s1v3 = data.puntos;
  
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '1')
                s2l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '1')
                s2v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '2')
                s2l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '2')
                s2v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'S2' && data.n_set == '3')
                s2l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'S2' && data.n_set == '3')
                s2v3 = data.puntos;

            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '1')
                d1l1 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '1')
                d1v1 = data.puntos;
            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '2')
                d1l2 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '2')
                d1v2 = data.puntos;
            if(data.lv == 'l' && data.partido == 'D1' && data.n_set == '3')
                d1l3 = data.puntos;
            if(data.lv == 'v' && data.partido == 'D1' && data.n_set == '3')
                d1v3 = data.puntos;
  
      }
      this.s1_sets = s1l1+''+s1v1+''+s1l2+''+s1v2+''+s1l3+''+s1v3;
      this.s2_sets = s2l1+''+s2v1+''+s2l2+''+s2v2+''+s2l3+''+s2v3;
      this.d1_sets = d1l1+''+d1v1+''+d1l2+''+d1v2+''+d1l3+''+d1v3;

      //sets totales S1
        if(s1l1 > s1v1)
            this.s1_l_t_sets += 1;
        else if(s1l1 < s1v1)
            this.s1_v_t_sets += 1;

        if(s1l2 > s1v2)
            this.s1_l_t_sets += 1;
        else if(s1l2 < s1v2)
            this.s1_v_t_sets += 1;

        if(s1l3 > s1v3)
            this.s1_l_t_sets += 1;
        else if(s1l3 < s1v3)
            this.s1_v_t_sets += 1;

        //sets totales S2
        if(s2l1 > s2v1)
            this.s2_l_t_sets += 1;
        else if(s2l1 < s2v1)
            this.s2_v_t_sets += 1;

        if(s2l2 > s2v2)
            this.s2_l_t_sets += 1;
        else if(s2l2 < s2v2)
            this.s2_v_t_sets += 1;

        if(s2l3 > s2v3)
            this.s2_l_t_sets += 1;
        else if(s2l3 < s2v3)
            this.s2_v_t_sets += 1;

            
        //sets totales D1
        if(d1l1 > d1v1)
            this.d1_l_t_sets += 1;
        else if(d1l1 < d1v1)
            this.d1_v_t_sets += 1;

        if(d1l2 > d1v2)
            this.d1_l_t_sets += 1;
        else if(d1l2 < d1v2)
            this.d1_v_t_sets += 1;

        if(d1l3 > d1v3)
            this.d1_l_t_sets += 1;
        else if(d1l3 < d1v3)
            this.d1_v_t_sets += 1;

       

      });

      this._db.db.executeSql('SELECT * FROM encuentros_jugadores WHERE encuentro_id = ?',[this.encuentroId]).then(res=>{
        for (let i = 0; i < res.rows.length; i++) 
        {
          let data = res.rows.item(i);
          
              //console.log(res.rows.item(i).jugador_id); 
              if(data.lv == 'l' && data.partido == 'S1')
              {
                this.s1_loc_jug = data.jugador_id;
                this.s1_loc_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'S1')
              {
                this.s1_vis_jug = data.jugador_id;
                this.s1_vis_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'S2')
              {
                this.s2_loc_jug = data.jugador_id;
                this.s2_loc_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'S2')
              {
                this.s2_vis_jug = data.jugador_id;
                this.s2_vis_jug_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'D1')
              {
                this.d1_loc_jug_1 = data.jugador_id;
                this.d1_loc_jug_1_n = data.jugador_nombre;
              }
              if(data.lv == 'l' && data.partido == 'D2')
              {
                this.d1_loc_jug_2 = data.jugador_id;
                this.d1_loc_jug_2_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'D1')
              {
                this.d1_vis_jug_1 = data.jugador_id;
                this.d1_vis_jug_1_n = data.jugador_nombre;
              }
              if(data.lv == 'v' && data.partido == 'D2')
              {
                this.d1_vis_jug_2 = data.jugador_id;
                this.d1_vis_jug_2_n = data.jugador_nombre;
              }
          }
        });

  }

  sendData()
  {


    let data =  {
      'encuentrosId':this.encuentroId,
      'partidos':[
        {
          'tipo':'S1',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.s1_loc_jug,
          'jugadorIdVisita1' : this.s1_vis_jug,
          'sets': this.s1_sets,
        },
        {
          'tipo':'S2',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.s2_loc_jug,
          'jugadorIdVisita1' : this.s2_vis_jug,
          'sets':this.s2_sets,
        },
        {
          'tipo':'D1',
          "equipoIdLocal": this.local_id,
          "equipoIdVisita": this.visita_id,
          'jugadorIdLocal1' : this.d1_loc_jug_1,
          'jugadorIdLocal2' : this.d1_loc_jug_2,
          'jugadorIdVisita1' : this.d1_vis_jug_1,
          'jugadorIdVisita' : this.d1_vis_jug_2,
          'sets': this.d1_sets
        }
      ]
    };

     this._es.postEncuentrosResultados(data).then(res=>{
       console.log(res);
       // this.navCtrl.pop();
     },(err)=>{
       console.log(err);
     });
    
  }

  
}
