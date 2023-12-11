import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from "./about/about.component";
import { ClipComponent } from "./clip/clip.component";
import { NotFoundComponent } from "./404/404.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "clip/:id",
        component: ClipComponent,
        data:{
            authOnly: true
        }
    },
    {
        path: "**",
        component: NotFoundComponent
    }

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {};