import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoJugadorPage } from './nuevo-jugador';

@NgModule({
  declarations: [
    NuevoJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoJugadorPage),
  ],
})
export class NuevoJugadorPageModule {}
