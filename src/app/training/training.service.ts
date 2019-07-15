import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { Subscription} from 'rxjs';
import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];



  constructor(private db: AngularFirestore,
              private uiservice: UIService) { }


  fetchAvailableLocations() {
    this.uiservice.loadingStateChagne.next(true);
    this.fbSubs.push(this.db
    .collection('Locations')
    .snapshotChanges()
    .pipe(map(docData => {
      return docData.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['Name'],
          GeoData: doc.payload.doc.data()['GeoData'],
        };
    });
  })
   )
   .subscribe((exercises: Exercise[]) => {
      this.uiservice.loadingStateChagne.next(false);
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);
    }, error => {
      this.uiservice.showSnackbar('Fetching Locations Failed', null, 3000);
    }));
  }

startExercise(selectId: string) {

    console.log(selectId);
    console.log( this.availableExercises.find(
             ex => ex.id === selectId
           ));


 //this.db.doc('Locations/' + selectId).update({lastSelected: new Date()});
 //
 //   this.runningExercise = this.availableExercises.find(
 //       ex => ex.id === selectId
 //       );
  this.exerciseChanged.next({ ...this.runningExercise });
  }


  completeExercise(progress: number)  {
    this.addDataToDatabase({...this.runningExercise,
      date: new Date(),
      state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number)  {

   // this.addDataToDatabase({...this.runningExercise,
     // duration: this.runningExercise.duration * (progress / 100),
   //   calories: this.runningExercise.calories * (progress / 100),
   //   date: new Date(),
   //   state: 'cancalled'});
   //   this.runningExercise = null;
   //   this.exerciseChanged.next(null);

  }

  getCompletedOrCancelledExercises() {
    this.db.collection('finishedExercise')
    .valueChanges()
    .subscribe((exercise:  Exercise[]  ) => {
      this.finishedExercisesChanged.next(exercise);
    });
  }

  getRunningExercie() {
     return { ...this.runningExercise };
   }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercise').add(exercise);
  }

 fetchCompletedOrCancelledExercises() {
      this.fbSubs.push(this.db
      .collection('finishedExercise')
      .valueChanges()
      .subscribe((exercises:  Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));

  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
