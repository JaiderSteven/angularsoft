import { Component,Output,EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { FormGroup,FormBuilder,Validators,FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import { fromEvent,map,filter,debounceTime,distinctUntilChanged,switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
    selector: 'app-form-destino-viaje',
    templateUrl: './form-destino-viaje.component.html',
    styleUrls: ['./form-destino-viaje.component.css']
})

export class FormDestinoViajeComponent {
    @Output() onItemAdded: EventEmitter<DestinoViaje>;
    public formGroup: FormGroup;
    minLongitud = 5;
    busqueda: string[];
    
    constructor(formBuilder: FormBuilder){
        this.onItemAdded = new EventEmitter();
        this.busqueda = [];
        this.formGroup = formBuilder.group({
            'nombre': ['',Validators.compose([
                Validators.required,
                this.comprobarNombre,
                this.nombreInvalido(this.minLongitud)
            ])],
            'url': ['',Validators.required]
        });
    }

    ngOnInit() {
        let elementoNombre = <HTMLInputElement>document.getElementById('nombre');
        fromEvent(elementoNombre,'input').pipe(
            map((evento: Event) => (evento.target as HTMLInputElement).value),
            filter(text => text.length > 2),
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(() => ajax('/assets/datos.json'))
        ).subscribe(ajaxResponse => {
            this.busqueda = ajaxResponse.response as string[];
            console.log(this.busqueda);
        });
    }

    guardar(nombre:string,url:string):boolean {
        const destino = new DestinoViaje(nombre,url);
        this.onItemAdded.emit(destino);
        return false;
    }

    comprobarNombre(control: FormControl): {[s:string]: boolean} | null {
        const longitud = control.value.toString().trim().length;

        if(longitud > 0 && longitud < 5) {
            return { invalidNombre: true};
        }

        return null;
    }

    nombreInvalido(minLong: number): ValidatorFn {
        return (control: AbstractControl): {[s:string]: boolean} | null => {
            const longitud = control.value.toString().trim().length;

            if(longitud > 0 && longitud < minLong) {
                return { lengthInvalido: true};
            }
            
            return null;
        }
    }
}
