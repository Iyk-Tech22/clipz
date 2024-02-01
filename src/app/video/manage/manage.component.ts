import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import IClip from "src/app/model/clip.model";
import { ClipService } from "src/app/services/clip.service";
import { ModalService } from "src/app/services/modal.service";
import { BehaviorSubject } from "rxjs";


@Component({
    selector: "app-manage",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.css"]
})

export class ManageComponent implements OnInit {
    videoOrder = "1";
    clips: IClip[] = [];
    selectedClip: (IClip | null) = null;
    sort$: BehaviorSubject<string>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clipService: ClipService,
        private model: ModalService
    ) {
        this.sort$ = new BehaviorSubject(this.videoOrder);
    }
    
    ngOnInit(): void {
        this.route.queryParamMap.subscribe((query: Params) => {
           this.videoOrder = query["params"]["sort"] == "2" ? query["params"]["sort"]: "1";
           this.sort$.next(this.videoOrder);
        });
        this.clipService.getUserClips(this.sort$).subscribe(docs => {
            this.clips = [];

            docs.forEach(doc => {
                this.clips.push({
                    docID: doc.id,
                    ...doc.data()
                })
            });
        });
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

    openModel($event: Event, clip: IClip){
        $event.preventDefault();
        this.model.toggleModal("edit");
        this.selectedClip = clip;      
    }

    updateClip(clip: any){
        this.clips.map(item => {
            if(item?.docID == clip.id){
                item.title = clip.title;
            }
        })
    }

    deleteClip($event: Event, clip: IClip){
        $event.preventDefault();
        this.clipService.deleteClip(clip);
        this.clips = this.clips.filter(item => item.docID != clip.docID)
    }

    async copyToClipboard(event: MouseEvent, clipID: string | undefined){
        event.preventDefault();
        
        if(!clipID)
        {
            return;
        }

        const url = `${location.origin}/clip/${clipID}`;
        await navigator.clipboard.writeText(url);

        alert("Link Copied");
    }
}
