import { Component } from "@angular/core";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent {
    
    credential = {
        email: "hello world",
        password: ""
    };

    login() {
        console.log("login")
    }
}