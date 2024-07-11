import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChildPage } from './child.page';

const routes: Routes = [
  {
    path: '',
    component: ChildPage
  },
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'vaccine/:id', loadChildren: './vaccine/vaccine.module#VaccinePageModule' },
  { path: 'followup/:id', loadChildren: './followup/followup.module#FollowupPageModule' },
  { path: 'growth', loadChildren: './growth/growth.module#GrowthPageModule' },
  { path: 'invoice/:id', loadChildren: './invoice/invoice.module#InvoicePageModule' },
  { path: 'cmsg/:id', loadChildren: './cmsg/cmsg.module#CMsgPageModule' },
  {path:'special/:id',loadChildren:'./specialCase/specialCase.module#SpecialCasePageModule'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChildPage]
})
export class ChildPageModule { }
