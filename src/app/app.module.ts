import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { AngularFireModule } from "@angular/fire/compat"
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing-module';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component'
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './404/404.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipListComponent } from './cliplist/clip-list.component';
import { FbTimestampPipe } from './pipes/pipe.fb-timestamp';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClipComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    ClipListComponent,
    FbTimestampPipe
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireStorageModule,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
