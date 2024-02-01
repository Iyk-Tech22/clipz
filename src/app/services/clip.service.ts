import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from "@angular/fire/compat/firestore";
import IClip from "../model/clip.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app"
import { of, switchMap, map } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { BehaviorSubject, combineLatest } from "rxjs";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"


@Injectable({
    providedIn: "root"
})

export class ClipService implements Resolve<IClip | null> {
    public clipCollection: AngularFirestoreCollection<IClip>;
    public pageClips: IClip[] = [];
    private pendingReq = false;

    constructor(
        private db: AngularFirestore,
        private auth: AngularFireAuth,
        private storage: AngularFireStorage,
        private router: Router
        ){
        this.clipCollection = db.collection("clips");
        
    }

    createClip(data: IClip): Promise<DocumentReference<IClip>>{
        return this.clipCollection.add(data);
    }

    getUserClips(sort$: BehaviorSubject<string>) {
        return combineLatest(this.auth.user, sort$).pipe(
            switchMap(values => {
                const [user, sort] = values;
                if(!user){
                    return of([]);
                }
                
                const query = this.clipCollection.ref.where(
                    "uid", "==", user.uid
                ).orderBy(
                    "timestamp",
                    sort === "1"? "desc":"asc"
                )
                return query.get();
            }),
            map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
        )
    }

    updateClip(id: string, title: string){
        return this.clipCollection.doc(id).update({
            title
        })
    }

    async deleteClip(clip: IClip){
        const clipFileName = `clips/${clip.clipFileName}`;
        const screenshotFileName = `screenshots/${clip.screenshotFileName}`;
        await this.storage.ref(clipFileName).delete();
        await this.storage.ref(screenshotFileName).delete();
        await this.clipCollection.doc(clip.docID).delete();
    }

        getClips = async () => {
        if(this.pendingReq)
        {
            return;
        }

        this.pendingReq = true;
        let query = this.clipCollection.ref.orderBy("timestamp", "desc").limit(6);
        const {length} = this.pageClips;

        if(length)
        {
            const lastDocID = this.pageClips[-1].docID;
            const lastDoc = await this.clipCollection.doc(lastDocID)
            .get()
            .toPromise();
            query = query.startAfter(lastDoc);
        }

        const querySnapshot = await query.get();
        this.pendingReq = false;
        querySnapshot.forEach(doc => {
            this.pageClips.push({
                docID: doc.id,
                ...doc.data()
            });
        });
    }

    // RESOLVER FETCH DATA BEFORE ROUTE NAVAIGATION
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.clipCollection.doc(route.params["id"])
        .get()
        .pipe(
            map(snapshot => {
                const data = snapshot.data();

                if(!data){
                    this.router.navigate(["/"]);
                    return null;
                }

                return data;
            })
        )
    }

}