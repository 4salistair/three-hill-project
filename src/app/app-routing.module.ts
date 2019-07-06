import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth-guard';

import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: 'src/app/training/training.module#TrainingModule', canLoad: [AuthGuard]}];


@NgModule({
  imports: [AuthModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
