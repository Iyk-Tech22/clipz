import { Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, provideNgxMask  } from "ngx-mask"

import { ModalComponent } from "./modal/modal.component"
import { TabComponent } from "./tab/tab.component"
import { TabContainerComponent } from "./tab-container/tab-container.component";
import { InputComponent } from "./input/input.component";
import { AlertComponent } from "./alert/alert.component";

@NgModule({
    declarations: [
        ModalComponent,
        TabComponent,
        TabContainerComponent,
        InputComponent,
        AlertComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective
    ],
    exports: [
        ModalComponent,
        TabComponent,
        TabContainerComponent,
        InputComponent,
        AlertComponent
    ],
    providers: [provideNgxMask()]
})

export class SharedModule {
    
}