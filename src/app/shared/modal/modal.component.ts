import { Component, Input, ElementRef, OnInit, OnDestroy } from  "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.css"]
})

export class ModalComponent implements OnInit, OnDestroy {
    
    @Input() modalID: string = "";

    constructor(public modal: ModalService, private el: ElementRef) {}

    ngOnInit(): void {
        document.body.appendChild(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        document.body.removeChild(this.el.nativeElement);
    }

    closeModal(id: string): void {
        this.modal.toggleModal(id)
    }
}