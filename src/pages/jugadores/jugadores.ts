import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { EncuentrosService } from '../../providers/encuentros/encuentros';

import { Storage } from '@ionic/storage';


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
              public storage:Storage,
              private toastCtrl: ToastController,
              public platform : Platform
            ){

      this.encuentroId = navParams.get('encuentrosId');
      this.getData();
   }


   getData()
   { 
    let data ;

    if(this.platform.is('cordova'))
      {
        this.storage.get(this.encuentroId).then((val) => {
           this.enc = val;
        });

      }else{
           this.enc = JSON.parse(localStorage.getItem(this.encuentroId));  
      }


      if(this.enc)
     {
        this.singles1local = this.enc.jugadorLocalSingle1;
        this.singles1visita = this.enc.jugadorVisitaSingle1;
        this.singles2local = this.enc.jugadorLocalSingle2;
        this.singles2visita = this.enc.jugadorVisitaSingle2;
        this.dobleslocal1 = this.enc.jugadorLocal1Doble;
        this.dobleslocal2 = this.enc.jugadorLocal2Doble;
        this.doblesvisita1 = this.enc.jugadorVisita1Doble;
        this.doblesvisita2 = this.enc.jugadorVisita2Doble;      
     }
  



     this._es.getEncuentro(this.encuentroId).subscribe(data => {
       this.local = data['equipoLocal']['id'];
       this.visita = data['equipoVisitante']['id'];
       this.localNombre = data['equipoLocal']['club']['nombre'];
       this.visitaNombre = data['equipoVisitante']['club']['nombre'];
       console.log(this.localNombre);
       this.getBfLocal();
       this.getBfVisita();
      });
   }

   getBfLocal()
   {
      this._es.getBuenFe(this.local).subscribe( data =>{
        this.bfLocal = data;
      });
   }
   getBfVisita()
   {
      this._es.getBuenFe(this.visita).subscribe( data =>{
        this.bfVisita = data;
      });
   }


   //envia data de jugadores
   sendPlayers(){

    let s1 = {};
    let s2 = {};
    let d1 = {};


    this.toastCtrl.create({message:'Guardando...', duration:500}).present();



    this.enc = {
      'id': this.encuentroId , 
      'jugadorLocalSingle1' : this.singles1local,
      'jugadorVisitaSingle1' : this.singles1visita,
      'jugadorLocalSingle2' : this.singles2local,
      'jugadorVisitaSingle2' : this.singles2visita,
      'jugadorLocal1Doble' : this.dobleslocal1,
      'jugadorLocal2Doble' : this.dobleslocal2,
      'jugadorVisita1Doble' : this.doblesvisita1,
      'jugadorVisita2Doble' : this.doblesvisita2,      
    };

      if(this.platform.is('cordova'))
      {
              this.storage.set(this.encuentroId, this.enc);
      }else{
              localStorage.setItem(this.encuentroId, JSON.stringify(this.enc));  
      }


    this.toastCtrl.create({message:'Datos Guardados.', duration:500}).present();
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
}