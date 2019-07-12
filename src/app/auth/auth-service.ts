import { AuthData } from './auth-data.module';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';


@Injectable()
export class AuthService {
    authChange =  new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
                private afauth: AngularFireAuth,
                private trainingService: TrainingService,
                private uiservice: UIService,
                private store: Store<{ui: fromApp.State}>
                ) {}

    innitAuthListener() {
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['']);
                this.isAuthenticated = false;
            }
        });
    }

    registeruser(authdata: AuthData) {
        //    this.uiservice.loadingStateChagne.next(true);
            this.store.dispatch({type: 'START_LOADING'});
            this.afauth.auth.createUserWithEmailAndPassword(
            authdata.email, authdata.password)
            .then(result => { this.uiservice.loadingStateChagne.next(false); })
            .catch(error =>  {
                this.uiservice.showSnackbar(error.message, null, 3000);
                // this.uiservice.loadingStateChagne.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
            });
        }



    login(authdata: AuthData) {
       // this.uiservice.loadingStateChagne.next(true);
       this.store.dispatch({type: 'START_LOADING'});
        this.afauth.auth.signInWithEmailAndPassword(
            authdata.email,
            authdata.password)
            .then(result => {
              //  this.uiservice.loadingStateChagne.next(false);
              this.store.dispatch({type: 'STOP_LOADING'});
            })
            .catch(error => {
              //  this.uiservice.loadingStateChagne.next(false);
              this.store.dispatch({type: 'STOP_LOADING'});
              this.uiservice.showSnackbar(error.message, null, 3000);
            }
            );

    }

    logout() {
        this.afauth.auth.signOut();
    }


    isAuth() {
        return this.isAuthenticated;
    }
}
