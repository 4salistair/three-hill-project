import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AgmCoreModule } from '@agm/core';
import { defineBase } from '@angular/core/src/render3';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})


export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;

  lat: number;
  lng: number;
  description: string;
  
 //err: call

  constructor(private dialog: MatDialog, private trainingservice: TrainingService) { }

  ngOnInit() {

  //  this.trainingservice.returnLongandLat();
  this.lat = this.trainingservice.getRunningExercie().lat;
  this.lng = this.trainingservice.getRunningExercie().long;
  this.description = this.trainingservice.getRunningExercie().description;


  console.log(this.description);

  // this.err = 'error';

   // this.geo.getCurrentPosition( postion => {this.displayLoction(postion); });
  // navigator.geolocation.getCurrentPosition( postion => {this.displayLoction(postion); });
  }


    displayLoction ( coords: any ) {

      const lng = coords.longitude;
      const lat = coords.latitude;
        }
      }


    //   position => {
    //  this.lat = position.coords.latitude;
    //  this.lng = position.coords.longitude;
    // });

    //console.log('current position ' + this.geo);

   // this.geotest
    //snapshotChange().


    //.GeoData.getCurrentPosition()

   // console.log('current position' + this.trainingservice.getRunningExercie().GeoData.getCurrentPosition.toString());

        // this.geo = this.trainingservice.getRunningExercie().GeoData;
        // this.geo.getCurrentPosition(position => {
        //       resolve({lat: position.coords.latitude, lng: position.coords.longitude});
        //       this.lng = position.coords.longitude;
        // });


  
 
  
  //console.log('GeoData' + step.getCurrentPosition);

  
  // startorResumeTraining() {
  //   const step = this.trainingservice.getRunningExercie().duration / 100 * 1000;

  //   this.timer = setInterval(() => {
  //     this.progress = this.progress + 5;

  //     if ( this.progress >= 100)
  //       {
  //         this.trainingservice.completeExercise(step);
  //         clearInterval(this.timer);
  //       }

  //   }, step);
  // }


  // onStop() {

  // clearInterval(this.timer);
  // const dailogRef = this.dialog.open(StopTrainingComponent, {
  //   data: {
  //     progress: this.progress
  //   }
  // });

  // dailogRef.afterClosed().subscribe(result => {
  //   if (result) { 
  //     this.trainingExit.emit(result);
  //     this.trainingservice.cancelExercise(this.progress);
  //   }
  //   else { 
  //     this.startorResumeTraining(); }
  //   });

 // }

  // private getLocation() {

  //     if (navigator.geolocation) {
  //        navigator.geolocation.getCurrentPosition(position => {
  //        this.lat = position.coords.latitude;
  //        this.lng = position.coords.longitude;

  //        console.log('lat' + this.lat);
  //        console.log('lng' + this.lng);
  //      });
     







