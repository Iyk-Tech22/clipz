import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms"


@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent {
    
    name = new FormControl("", [
        Validators.required,
        Validators.minLength(3)
    ])
    age = new FormControl("", [
        Validators.required,
        Validators.min(18),
        Validators.max(100)
    ])
    email = new FormControl("", [
        Validators.required,
        Validators.email
    ])
    phoneNumber = new FormControl("", [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13)
    ])
    password = new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ])
    confirmPassword = new FormControl("")

    registerForm = new FormGroup({
        name: this.name,
        email: this.email,
        age: this.age,
        phoneNumber: this.phoneNumber,
        password: this.password,
        comfirmPassword: this.confirmPassword
        
    });

    showAlert: boolean = false;
    alertColor: string = "";
    alertMsg: string = "";

    register(): void {
        this.showAlert = !this.showAlert;
        this.alertColor = "blue";
        this.alertMsg = "Please wait! Your account is being created.";
    }
}