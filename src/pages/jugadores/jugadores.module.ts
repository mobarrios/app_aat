import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JugadoresPage } from './jugadores';

@NgModule({
  declarations: [
    JugadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(JugadoresPage),
  ],
})
export class JugadoresPageModule {}
