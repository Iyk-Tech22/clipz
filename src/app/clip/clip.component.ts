import { Component } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { OnInit } from "@angular/core";

@Component({
    selector: "app-clip",
    templateUrl: "./clip.component.html",
    styleUrls: ["./clip.component.css"]
})

export class ClipComponent implements OnInit{
    id = "";

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(param => this.id = param["id"])
    }
}