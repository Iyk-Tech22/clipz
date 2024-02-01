import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import IUser from "src/app/model/user.model";
import { AuthService } from "src/app/services/auth.service";
import { RegisterValidators } from "../validators/register.validator";
import { EmailTaken } from "../validators/email-taken.validator";


@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent {
    
    constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

    name = new FormControl("", [
        Validators.required,
        Validators.minLength(3)
    ])

    age = new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(18),
        Validators.max(100)
    ])

    email = new FormControl("", [
        Validators.required,
        Validators.email
    ], [this.emailTaken.validate])

    phoneNumber = new FormControl("", [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13)
    ])

    password = new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    ])
    
    confirmPassword = new FormControl("", [
        Validators.required
    ])

    registerForm = new FormGroup({
        name: this.name,
        email: this.email,
        age: this.age,
        phoneNumber: this.phoneNumber,
        password: this.password,
        confirmPassword: this.confirmPassword
        
    }, [RegisterValidators.match("password", "confirmPassword")]);
    
    showAlert: boolean = false; 
    alertColor: string = "";
    alertMsg: string = "";
    isSubmission: boolean = false; 
    

    async register() {
        this.showAlert = !this.showAlert;
        this.alertColor = "blue";
        this.alertMsg = "Please wait! Your account is being created.";
        this.isSubmission = !this.isSubmission;

        try{
            
            await this.auth.createUser(this.registerForm.value as IUser);
        }
        catch(e){
            this.alertColor = "red";
            this.alertMsg = "Unexpected error occured, data wasn't processed try again.";
            this.isSubmission = !this.isSubmission;
            console.error(e);
            return;
        }

        this.alertMsg = "Successfully created an account.";
        this.alertColor = "green";
        this.isSubmission = !this.isSubmission;
    }
}