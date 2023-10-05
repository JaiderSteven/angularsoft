import { v4 as uuid } from 'uuid';

export class DestinoViaje {
    private selected!:boolean;
    public servicios:string[];
    id = uuid();

    constructor (public nombre:string,public imageUrl:string,public votes: number = 0) {
        this.servicios = ['Desayuno','Almuerzo','Merienda']
    }
    
    setSelected(ifSelected:boolean) {
        this.selected = ifSelected;
    }
    
    isSelected():boolean {
        return this.selected;

        voteUp() {
            this.votes++;
        }

        voteDown() {
            this.votes--;
        }
    }

}
