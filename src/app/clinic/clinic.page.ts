import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../services/clinic.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.page.html',
  styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {

  clinics: any;
  constructor(
    private api: ClinicService,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.storage.get("DoctorID").then((val) => {
      this.getClin(val);
    });

  }

  async getClin(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.getClinic(id).subscribe(
      res => {
        if (res.IsSuccess) {
          this.clinics = res.ResponseData;
          loading.dismiss();
        }
        else {
          loading.dismiss();
          this.toast.create(res.Message)
        }
      },
      err => {
        loading.dismiss();
        this.toast.create(err);
      }
    );
  }

  movehomepage(id) {
    this.storage.set('ClinicID', id);
    this.router.navigate(['/home']);
  }
}
