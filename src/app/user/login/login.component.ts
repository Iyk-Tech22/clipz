import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent {
    
    constructor(private auth: AngularFireAuth){}

    credential = {
        email: "",
        password: ""
    };
    alertMsg = "";
    alertShow = false;
    alertColor = "blue";
    isSubmission = false;

    async login() {
        this.alertMsg = "Please wait, We are authencating you...";
        this.alertColor = "blue";
        this.alertShow = true;
        this.isSubmission = !this.isSubmission;
       
        try{
            await this.auth.signInWithEmailAndPassword(
                this.credential.email, this.credential.password
            );
        }
        catch{
            this.alertMsg = "Authentication failed, enter a valid details.";
            this.alertColor = "red";
            this.isSubmission = !this.isSubmission;
            return;
        }
        this.alertMsg = "Authentication successful, you are logged in";
        this.alertColor = "green";
    }
}