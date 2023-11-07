import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import {AuthModalComponent } from "./auth-modal/auth-modal.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations: [
        AuthModalComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AuthModalComponent,
        LoginComponent,
        RegisterComponent
    ],
})

export class UserModule {

}