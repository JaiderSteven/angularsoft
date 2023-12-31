import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions,createEffect,ofType } from '@ngrx/effects';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

export interface DestinosViajesState {
    items: DestinoViaje[],
    loading: boolean,
    favorito: DestinoViaje
}

export const initializeDestinosViajesState = function() {
    return {
        items: [],
        loading: false,
        favorito: null
    }
}

// ACCIONES

export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down'
}

export class NuevoDestinoAction implements Action {
    type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViaje){}
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViaje){}
}

export class VoteUpAction implements Action {
    type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViaje){}
}

export class VoteDownAction implements Action {
    type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViaje){}
}

export type DestinosViajesAction = NuevoDestinoAction | ElegidoFavoritoAction | VoteDownAction | VoteUpAction;

// REDUCERS

export function reducerDestinosViajes(
    state: DestinosViajesState,
    action: DestinosViajesAction
): DestinosViajesState {
    switch (action.type) {
        case DestinosViajesActionTypes.NUEVO_DESTINO: {
            return {
                ...state,
                items: [...state.items, (action as NuevoDestinoAction).destino]
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            const d: DestinoViaje = (action as VoteUpAction).destino;
            d.voteUp();
            return {...state};
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            const d: DestinoViaje = (action as VoteDownAction).destino;
            d.voteDown();
            return {...state};
        }
    }
    
    return state;
}

// EFFECTS

@Injectable()
export class DestinosViajesEffects {
    Efecto$ = createEffect(() => this.actions$.pipe(
            ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
            map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    ));

    constructor(private actions$: Actions){}
}
