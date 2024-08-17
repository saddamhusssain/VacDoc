import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DoctorPage } from "./doctor.page";

const routes: Routes = [
  {
    path: "",
    component: DoctorPage
  },
  { path: "clinic", loadChildren: "./clinic/clinic.module#ClinicPageModule" },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule"
  },
  {
    path: "vacation",
    loadChildren: "./vacation/vacation.module#VacationPageModule"
  },
  {
    path: "schedule",
    loadChildren: "./schedule/schedule.module#SchedulePageModule"
  },
  {
    path: "brand-amount",
    loadChildren: "./brand-amount/brand-amount.module#BrandAmountPageModule"
  },
  {
    path: "password",
    loadChildren: "./password/password.module#PasswordPageModule"
  },
  {
    path: "sms-setting",
    loadChildren: "./sms-setting/sms-setting.module#SMSSettingPageModule"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorPage]
})
export class DoctorPageModule {}
