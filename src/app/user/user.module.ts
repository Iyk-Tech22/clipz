import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";

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
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        AuthModalComponent
    ],
})

export class UserModule {

}