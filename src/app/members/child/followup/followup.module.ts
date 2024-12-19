import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FollowupPage } from './followup.page';

const routes: Routes = [
  {
    path: '',
    component: FollowupPage
  },
  { path: 'addfollowup', loadChildren: () => import('./addfollowup/addfollowup.module').then(m => m.AddfollowupPageModule) }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FollowupPage]
})
export class FollowupPageModule {}
