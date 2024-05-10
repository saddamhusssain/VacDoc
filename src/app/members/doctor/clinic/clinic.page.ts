import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ClinicService } from "src/app/services/clinic.service";
import { ToastService } from "src/app/shared/toast.service";
import { Storage } from "@ionic/storage";
import { environment } from "src/environments/environment";
import { NavigationEnd, Router } from "@angular/router";
import { AlertService } from "src/app/shared/alert.service";

@Component({
  selector: "app-clinic",
  templateUrl: "./clinic.page.html",
  styleUrls: ["./clinic.page.scss"]
})
export class ClinicPage {
  Clinics: any;
  dispclinics: any = [];
  doctorId: number;
  clinicId: any;
  onlineclinic: any;

  constructor(
    public loadingController: LoadingController,
    public clinicService: ClinicService,
    private toastService: ToastService,
    private storage: Storage,
    private router: Router,
    private alertService: AlertService
  ) {
    this.router.events.subscribe((val) => {
      // Check if redirected from another page
      if (val instanceof NavigationEnd) {
        this.getClinics();
      }
    });
  }

  async ngOnInit() {

    await this.storage.get(environment.DOCTOR_Id).then(docId => {
      this.doctorId = docId;
    });
    // await this.storage.get(environment.CLINIC_Id).then(clinicId => {
    //   this.clinicId = clinicId;
    // });
    // await this.storage.get(environment.CLINICS).then(clinics => {
    //   this.Clinics = clinics;
    // });
    console.log(this.Clinics);
    console.log(this.doctorId);
    if (!this.Clinics) {
      this.getClinics();
    }
    if (this.Clinics) {
      this.Clinics = this.Clinics;
    } else {
      // Fetch clinics only if they haven't been fetched before
      this.getClinics();
    }
  }

  async getClinics() {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    await this.clinicService.getClinics(this.doctorId).subscribe(
      res => {
        loading.dismiss();
        if (res.IsSuccess) {
          console.log(res);
          this.Clinics = res.ResponseData;
          for (let i = 0; i < this.Clinics.length; i++) {
            const clinic = this.Clinics[i];
            // Access ClinicTimings array
            if (clinic.ClinicTimings) {
              // Iterate over each timing in ClinicTimings
              for (let j = 0; j < clinic.ClinicTimings.length; j++) {
                const timing = clinic.ClinicTimings[j];

                // Process timing as needed
                console.log(timing);
              }
            }
          }
          // this.storage.set(environment.CLINICS, this.Clinics);
          // for (let i = 0; i < this.Clinics.length; i++) {
          //   if (this.Clinics[i].IsOnline) {
          //     this.storage.set(
          //       environment.CLINIC_Id,
          //       this.Clinics[i].Id
          //     );
          //     this.storage.set(
          //       environment.ON_CLINIC,
          //       this.Clinics[i]
          //     );
          //     this.clinicService.updateClinic(this.Clinics[i])
          //   }
          // }
           this.ngOnInit();
        } else {
          loading.dismiss();
          this.toastService.create(res.Message, "danger");
        }
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, "danger");
      }
    );
  }

  async setOnlineClinic(clinicId) {
    const loading = await this.loadingController.create({ message: "Loading" });
    await loading.present();
    let data = { 'DoctorId': this.doctorId, 'Id': clinicId, 'IsOnline': 'true' }
    await this.clinicService.changeOnlineClinic(data)
      .subscribe(res => {
        if (res.IsSuccess) {
          loading.dismiss();
          this.getClinics();
          // this.router.navigate(['/members/doctor/clinic']);
        }
        else {
          this.toastService.create(res.Message)
        }

      }, (err) => {
        this.toastService.create(err);
      });
    loading.dismiss();
  }
  // }

  alertDeleteClinic(id) {
    this.alertService
      .confirmAlert("Are you sure you want to delete this ?")
      .then(yes => {
        if (yes) {
          this.deleteClinic(id);
        }
      });
  }

  async deleteClinic(id) {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    await this.clinicService.deleteClinic(id).subscribe(
      res => {
        if (res.IsSuccess == true) {
          this.router.navigate(['/members/doctor/clinic']);
          loading.dismiss();
        }
        else {
          loading.dismiss();
          this.toastService.create(res.Message, 'danger');
        }
      },
      err => {
        loading.dismiss();
        this.toastService.create(err, 'danger')
      }
    );
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

}
