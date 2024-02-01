import { Component, OnDestroy} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { v4 as uuid } from "uuid";
import { last, switchMap } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app"
import { ClipService } from "src/app/services/clip.service";
import { Router } from "@angular/router";
import { FFmpegService } from "src/app/services/ffmpeg.service";
import { combineLatest, forkJoin } from "rxjs";


@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.css"]
})

export class UploadComponent implements OnDestroy{
    isDragOver = false;
    file: (File | null) = null;
    nextStep = false;
    title = new FormControl("", {
        validators: [
            Validators.required,
            Validators.minLength(4)
        ],
        nonNullable: true
    });
    uploadForm = new FormGroup({
        title: this.title
    });
    showAlert = false;
    alertMsg = "Please wait...video upload is in progress";
    alertColor = "blue";
    uploadProgress = 0;
    isSubmission = false;
    showPercentage = true;
    user:(firebase.User | null) = null;
    task: (AngularFireUploadTask | null) = null;
    screenshots: string[] = [];
    selectedScreenshot: string = "";
    screenshotTask: (AngularFireUploadTask | null) = null;
    
    constructor(
        private storage: AngularFireStorage,
        private auth:AngularFireAuth, 
        private clipService: ClipService,
        private router: Router,
        public ffmpeg: FFmpegService,

    )
    {
        this.auth.user.subscribe(user => this.user = user);
        ffmpeg.init();
    }
    
    ngOnDestroy(){
        this.task?.cancel();
    }

    async storeFile($event: Event){
        if (this.ffmpeg.isRunning){
            return;
        }

        this.isDragOver = false;
        this.file = ($event as DragEvent).dataTransfer?
        ($event as DragEvent).dataTransfer?.files.item(0) ?? null:
        ($event.target as HTMLInputElement).files?.item(0) ?? null

        if(!this.file || this.file.type !== "video/mp4")
        {
            return;
        }

        this.screenshots = await this.ffmpeg.getScreenshot(this.file);
        this.selectedScreenshot = this.screenshots[0];

        this.title.setValue(
            this.file.name.replace(".mp4", "")
        )
        this.nextStep = true;
    }
    async upload(){
        this.uploadForm.disable();
        this.showAlert = true;
        this.alertMsg = "Please wait...video upload is in progress";
        this.alertColor = "blue";
        this.isSubmission = !this.isSubmission;
        const clipFileName = uuid();
        const clipPath = `clips/${clipFileName}.mp4`;
        const screenshotPath = `screenshots/${clipFileName}.png`;

        const screenshotBlob = await this.ffmpeg.blobFromUrl(
            this.selectedScreenshot
        );
        
        this.task = this.storage.upload(clipPath, this.file);
        const clipRef = this.storage.ref(clipPath);

        this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob);
        const screenshotRef = this.storage.ref(screenshotPath);

        combineLatest([
            this.task.percentageChanges(),
            this.screenshotTask.percentageChanges()
        ]).subscribe(
            progress => {
                const [clipProgress, screenshotProgress] = progress;
                if (!clipProgress || !screenshotProgress)
                {
                    return;
                }
                const total = clipProgress + screenshotProgress;
                this.uploadProgress = total as number / 200;
            }
        )

        forkJoin(
            [
                this.task.snapshotChanges(),
                this.screenshotTask.snapshotChanges()
            ]
        ).pipe(
            switchMap(() => forkJoin(
                    [
                        clipRef.getDownloadURL(),
                        screenshotRef.getDownloadURL()
                    ]
                )
            )

        ).subscribe({
            next: async (urls) => {
                const [clipUrl, screenshotUrl] = urls;
                const clip = {
                    uid: (this.user?.uid as string),
                    displayName: (this.user?.displayName as string),
                    title: this.title.value,
                    clipFileName: `${clipFileName}.mp4`,         
                    clipUrl,
                    screenshotUrl,
                    screenshotFileName: `${clipFileName}.png`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
                const clipDoc= await this.clipService.createClip(clip);
                setTimeout(()=>{
                    this.router.navigate(["clip", clipDoc?.id])
                }, 1000);
                this.alertColor = "green";
                this.alertMsg = "Success! Your clip is now ready to share with the world"
                this.showPercentage = false;
            },
            error: () => {
                this.uploadForm.enable();
                this.alertColor = "red";
                this.alertMsg = "Upload failed! Please try again later.";
                this.isSubmission = false;
                this.showPercentage = false;
            }
        })
    }

}
