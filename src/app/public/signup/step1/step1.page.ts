import { Component, ViewChild, OnInit } from "@angular/core";
import { IonSelect } from "@ionic/angular";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignupService } from "src/app/services/signup.service";

@Component({
  selector: "app-step1",
  templateUrl: "./step1.page.html",
  styleUrls: ["./step1.page.scss"],
})
export class Step1Page implements OnInit {
  fg: FormGroup;
  checkedVal: any;
  @ViewChild("speciality", { static: false }) selectPop: IonSelect;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService
  ) {}

  ngOnInit() {
    this.fg = this.formBuilder.group({
      DoctorType: new FormControl("CS"),
      Qualification: [],
      AdditionalInfo: [
        "",
        [
          Validators.required,
          this.fourLinesValidator,
        ],
      ],
      FirstName: [],
      LastName: [],
      DisplayName: [],
      Email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
          ),
        ])
      ),
      Speciality: [],
      Password: [],
      CountryCode: ["92"],
      MobileNumber: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{10}$"),
        ])
      ),
      ShowMobile: [true],
      PhoneNo: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(11),
          Validators.pattern("^([0-9]*)$"),
        ])
      ),
      ShowPhone: [true],
      PMDC: new FormControl(
        "12345-A",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9-\\+]*-[a-zA-Z]$"),
        ])
      ),
    });
  }

  
  fourLinesValidator(control: FormControl) {
    const value = control.value || "";
    const lines = value.split('\n').filter(line => line.trim() !== '');
    return lines.length >= 4 ? null : { insufficientLines: true };
  }
  

  PasswordGenerator() {
    var length = 4,
      charset = "0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  nextpage() {
    this.fg.value.Password = this.PasswordGenerator();
    this.signupService.personalData = this.fg.value;
    console.log(this.fg.value);

    this.router.navigate(["/signup/step2"]);
  }

  setValueAndShowSpeciality(value: string, checkedVal) {
    this.fg.value.DoctorType = value;
    this.checkedVal = checkedVal;
  }

  opendrop() {
    this.selectPop.open();
  }




  validation_messages = {
    FirstName: [{ type: "required", message: "First Name is required." }],
    LastName: [{ type: "required", message: "Last Name is required." }],
    DisplayName: [{ type: "required", message: "Display Name is required." }],
    Email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." },
    ],
    MobileNumber: [
      { type: "required", message: "Mobile Number is required." },
      { type: "pattern", message: "Mobile number must be like 3331231231." },
    ],
    PhoneNo: [
      { type: "required", message: "Phone number is required." },
      {
        type: "minlength",
        message: "Phone Number must be at least 7 digits long.",
      },
      {
        type: "maxlength",
        message: "Phone Number must be at most 11 digits long.",
      },
      { type: "pattern", message: "Enter must be a number." },
    ],
    PMDC: [
      { type: "required", message: "PMDC is required." },
      { type: "pattern", message: "PMDC is required like 12345-A." },
    ],

    AdditionalInfo: [
      { type: "required", message: "Additional Info is required." },
      {
        type: "insufficientLines",
        message: "Input must contain at least four lines.",
      },
    ],
  };
}
