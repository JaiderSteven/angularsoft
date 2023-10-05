import { Component,Output,EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destino-client-api.model';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, NuevoDestinoAction } from 'src/app/models/destino-viaje-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})

export class ListaDestinosComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all;

  constructor(public destinosApiClient:DestinosApiClient,private store: Store){
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destino.favorito).subscribe(d => {
      if (d != null) {
        this.updates.push('Has añadido ' + d.nombre + ' a favoritos.');
      }
    });
    store.select(state => state.destino.items).subscribe(items => this.all = items);
  }

  agregado(destino: DestinoViaje) {
    this.destinosApiClient.añadir(destino);
    this.onItemAdded.emit(destino);
  }

  elegir(ifSelected:DestinoViaje) {
    this.destinosApiClient.elegido(ifSelected);
  }

  obtenerTodo() {

  }
}
