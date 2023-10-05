import { Component,Input,HostBinding,Output,EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { AppState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { VoteDownAction, VoteUpAction } from 'src/app/models/destino-viaje-state.model';

@Component({
    selector: 'app-destino-viaje',
    templateUrl: './destino-viaje.component.html',
    styleUrls: ['./destino-viaje.component.css']
})

export class DestinoViajeComponent {
    @Input() destino!:DestinoViaje;
    @Input('idx') posicion!:number;
    @HostBinding('class') cssClass = 'col-md-4 pb-4';
    @Output() clicked: EventEmitter<DestinoViaje>; 

    constructor(){
        this.clicked = new EventEmitter();
    }

    ir(){
        this.clicked.emit(this.destino);
        return false;
    }

    voteUp() {
        this.store.dispatch(new VoteUpAction(this.destino));
        return false;
    }

    voteDown() {
        this.store.dispatch(new VoteDownAction(this.destino));
        return false;
    }
}
