import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import {AuthModalComponent } from "./auth-modal/auth-modal.component"

@NgModule({
    declarations: [
        AuthModalComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AuthModalComponent
    ],
})

export class UserModule {

}