import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ClipService } from "../services/clip.service";
import IClip from "../model/clip.model";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-clip-list",
    templateUrl: "./clip-list.component.html",
    styleUrls: ["./clip-list.component.css"],
    providers: [DatePipe]
})

export class ClipListComponent implements OnInit, OnDestroy {

    @Input() scrollable = false;

    constructor(public clipService: ClipService){
        clipService.getClips();
    }
    
    ngOnInit(): void {
        if (this.scrollable) {
            window.addEventListener("scroll", this.scrollEventHandler);
        }
    }

    ngOnDestroy(): void {
        if (this.scrollable)
        {
            window.removeEventListener("scroll", this.scrollEventHandler);
        }
        this.clipService.pageClips = [];
    }

    scrollEventHandler = () => {
        const {scrollTop, offsetHeight} = document.documentElement;
        const {innerHeight} = window;

        const bottomOfPage = Math.round(scrollTop) + innerHeight == offsetHeight;
        if(bottomOfPage)
        {
            this.clipService.getClips()
        }
    }

}