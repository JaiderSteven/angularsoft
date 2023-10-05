import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { DestinosApiClient } from './models/destino-client-api.model';
import { 
  DestinosViajesState,
  reducerDestinosViajes,
  initializeDestinosViajesState,
  DestinosViajesEffects
} from './models/destino-viaje-state.model';
import { StoreModule as NgRxStoreModule,ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoComponent } from './components/destino/destino.component';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';

const rutas:Routes = [
  { path:'', component:ListaDestinosComponent },
  { path:'destinos', component:DestinoComponent }
]

// reduc init

export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
  destinos: initializeDestinosViajesState()
};

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    FormDestinoViajeComponent,
    DestinoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas),
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
