// MODULE IMPORTS
import { NgModule } from "@angular/core";
import { VideoRoutingModule } from "./video.routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
// COMPONENTS IMPORTS 
import { ManageComponent } from "./manage/manage.component";
import { UploadComponent } from "./upload/upload.component";
import { EditComponent } from "./edit/edit.component";
// PIPES IMPORTS
import { SafeUrlPipe } from "./pipes/safe-url.pipe";

@NgModule({
    declarations: [
        ManageComponent,
        UploadComponent,
        EditComponent,
        SafeUrlPipe
    ],
    imports: [
        CommonModule,
        VideoRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
}) 

export class VideoModule {}