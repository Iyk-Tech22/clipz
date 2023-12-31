import {Component} from "@angular/core";
import { ModalService } from "../services/modal.service";
import { AuthService } from "../services/auth.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.css"]
})

export class NavComponent {
    isAuthenticated: boolean = false;

    constructor(public modal: ModalService, public auth: AuthService) {
        this.auth.isAuthenticated$.subscribe(
            status => this.isAuthenticated = status
        );
    }

    openModal(event: Event): void {
        event.preventDefault();
        this.modal.toggleModal("auth");
    }
}