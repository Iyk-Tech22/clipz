import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import videojs from "video.js";
import IClip from "../model/clip.model";
import { DatePipe } from "@angular/common";
import { AnyMxRecord } from "dns";

@Component({
    selector: "app-clip",
    templateUrl: "./clip.component.html",
    styleUrls: ["./clip.component.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe]
})

export class ClipComponent implements OnInit{
    clip?: IClip;
    @ViewChild("videoPlayer", {
        "static": true
    }) target?: ElementRef;
    player?: any;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.player = videojs(this.target?.nativeElement);
        this.route.data.subscribe(({clip}) => {
            this.clip = clip;
            this.player?.src({
                src: this.clip?.clipUrl,
                type: "video/mp4"
            })
        });

    }
}