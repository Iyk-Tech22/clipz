import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { AngularFireModule } from "@angular/fire/compat"
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFirestoreModule } from "@angular/fire/compat/firestore"
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing-module';
import { VideoModule } from './video/video.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component'
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './404/404.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ClipComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    VideoModule,
    AppRoutingModule,
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
