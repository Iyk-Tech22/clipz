import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
    selector: "app-video",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.css"]
})

export class ManageComponent implements OnInit {
    videoOrder = "1";

    constructor(private router: Router, private route: ActivatedRoute) {}
    
    ngOnInit(): void {
        this.route.queryParamMap.subscribe((query: Params) => {
           this.videoOrder = query["params"]["sort"] == "2" ? query["params"]["sort"]: "1";
        })
    }

    sort($event: Event){
        const {value} = ($event.target as HTMLSelectElement);
        //this.router.navigateByUrl(`/manage?sort=${value}`);
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams:{
                sort: value
            }
        })

    }
}