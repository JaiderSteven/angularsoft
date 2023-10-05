import { DestinoViaje } from './destino-viaje.model';
import { BehaviorSubject,  Subject} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { NuevoDestinoAction,ElegidoFavoritoAction } from './destino-viaje-state.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DestinosApiClient {
    constructor(private store: Store<AppState>) {}

    añadir(destino: DestinoViaje) {
        this.store.dispatch(new NuevoDestinoAction(destino));
    }

    obtenerTodo(destino: DestinoViaje) {
        this.store.dispatch(new ElegidoFavoritoAction(destino));
    }
}
