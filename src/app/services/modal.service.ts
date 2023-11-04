import { Element } from "@angular/compiler";
import { Injectable } from "@angular/core";

interface IModal {
    id: string,
    visible: boolean
} 

@Injectable({
    providedIn: "root"
})

export class ModalService {
    public modals: IModal[] = [];

    register(id: string): void {
        this.modals.push({
            id,
            visible:false
        })
        console.log(this.modals)
    }

    unregister(id: string): void {
        this.modals = this.modals.filter(element => element.id !== id)
    }

    isModalOpen(id: string): boolean {
        return !!this.modals.find(element => element.id === id)?.visible
    }

    toggleModal(id: string): void {
        this.modals.map(element => {
            if(element.id === id){
                element.visible = !element.visible
            }
        })
    }
}