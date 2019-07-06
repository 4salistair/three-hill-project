import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  uiSubscription: Subscription;
  isListLoading = false;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
   ) {}

  ngOnInit() {
      this.uiSubscription = this.uiService.loadingStateChagne.subscribe(
      isListLoading => (this.isListLoading = isListLoading)
    );


     this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => ( this.exercises = exercises )
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
     this.exerciseSubscription.unsubscribe();
     this.uiSubscription.unsubscribe();
  }

}







