import { NgModule } from "@angular/core";
import { VideoRoutingModule } from "./video.routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        VideoRoutingModule,
        SharedModule
    ],
}) 

export class VideoModule {}