import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from "@angular/core";
import IClip from "src/app/model/clip.model";
import { ModalService } from "src/app/services/modal.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClipService } from "src/app/services/clip.service";

@Component({
    selector: "app-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["./edit.component.css"]
})

export class EditComponent implements OnInit, OnDestroy, OnChanges {

    @Input() activeClip: (IClip | null) = null;
    @Output() updateClip: EventEmitter<any> = new EventEmitter();

    clipID = new FormControl("",{
        nonNullable: true
    })
    title = new FormControl("", {
        validators:[
            Validators.required,
            Validators.minLength(4)
        ],
        nonNullable: true
    })
    editForm = new FormGroup({
        id: this.clipID,
        title: this.title
    })
    showAlert = false;
    inSubmission = false;
    alertMsg = "";
    alertColor = "";

    constructor(private model: ModalService, private clipService: ClipService) {}

    ngOnInit(): void {
        this.model.register("edit");
    }
    
    ngOnDestroy(): void {
        this.model.unregister("edit");
    }

    ngOnChanges(): void {
        if(!this.activeClip){
            return;
        }
        this.showAlert = false;
        this.clipID.setValue(this.activeClip?.docID ?? "");
        this.title.setValue(this.activeClip.title);
    }

    async submit($event: Event){
        this.showAlert = true;
        this.inSubmission = true;
        this.alertColor = "blue";
        this.alertMsg = "Please wait...Updating clip";

        try{
            await this.clipService.updateClip(this.clipID.value, this.title.value);
        }catch{
            this.alertColor = "red";
            this.alertMsg = "Clip update failed.";
            this.inSubmission = false;
            return;
        }
        
        this.updateClip.emit({
            id: this.clipID.value,
            title: this.title.value
        })
        this.alertColor = "green";
        this.alertMsg = "Clip updated sucessfully";
        this.inSubmission = false;
        

    }

}