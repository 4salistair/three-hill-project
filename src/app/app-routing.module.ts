import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthModule } from './auth/auth.module';
//import { AgmCoreModule} from '@agm/core';


const routes: Routes = [

  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: 'src/app/training/training.module#TrainingModule', canLoad: [AuthGuard]}];


@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(routes)
  //   ,
  //  AgmCoreModule.forRoot({
  //    apiKey: 'AIzaSyA_X6mefuVdOyLzCK1hFv-OTYi23oI-5kg'})

  ],
  exports: [RouterModule],
  providers: [AuthGuard],
 // schemas:  [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class AppRoutingModule { }
