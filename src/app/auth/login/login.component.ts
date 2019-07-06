import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { Subscription, Observable } from 'rxjs';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { map, take } from 'rxjs/operators'
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OES_element_index_uint{
  isLoading: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authservice: AuthService,
    private uiService: UIService
  //  private store: Store<{ui: fromApp.State} >
  ) {}

  ngOnInit() {


    ///***  ??? $$$ TEST UPDATE $$$ ??? ***///


    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.store.subscribe(data => console.log(data)); test
    this.loadingSubs = this.uiService.loadingStateChagne.subscribe(isLoading => 
    this.isLoading = isLoading);
  }


  onSubmit(form: NgForm){
    this.authservice.login({
    email: form.value.email,
    password: form.value.password
  });
}


ngOnDestroy() {
  if (this.loadingSubs) {
    this.loadingSubs.unsubscribe();
  }
}

}
