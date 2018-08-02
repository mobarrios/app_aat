import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/data-base/dataBase';
import { EncuentrosService } from '../../providers/encuentros/encuentros';

/**
 * Generated class for the NuevoJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-jugador',
  templateUrl: 'nuevo-jugador.html',
})
export class NuevoJugadorPage {

  public id:any;
  public dni:any;
  public nombre:any;
  public encuentro_id:any;
  public lv:any;
  public partido:any;
  public equipoId:any;
  public bf:any =[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public _db:DataBaseProvider, public viewCtrl: ViewController,
    public _es:EncuentrosService
  ) {

    this.encuentro_id = navParams.get('encuentroId');
    this.lv = navParams.get('lv');
    this.partido = navParams.get('partido');
    this.equipoId = navParams.get('equipoId');

    this.getData();


  }

  public guardar()
  {

    this._db.db.executeSql('INSERT INTO jugadores(dni, id_jugador, nombre) VALUES(?,?,?)',[this.dni,this.id, this.nombre]).then(
      res => {
        console.log('cargo');
        this._db.db.executeSql("INSERT INTO encuentros_jugadores ('encuentro_id' , 'lv' ,'partido' ,'jugador_nombre','jugador_id_store')values(?,?,?,?,?)",[this.encuentro_id, this.lv , this.partido , this.nombre , res['insertId'] ]
      );
      this.cerrar();
    });

  

  }

  public cerrar()
  {
    this.viewCtrl.dismiss();
  }

  getData(){
    this._es.getBuenFe(this.equipoId).subscribe( data =>{
      this.bf = data;
    });
  }

  add(id, dni , nombre)
  {
    this.dni = dni ;
    this.nombre = nombre;
    this.id = id;
  }
}
