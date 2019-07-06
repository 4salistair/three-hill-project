import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})


export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingservice: TrainingService) { }

  ngOnInit() {

    this.startorResumeTraining();
  }

  startorResumeTraining() {
    const step = this.trainingservice.getRunningExercie().duration / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress = this.progress + 5;

      if ( this.progress >= 100)
        {
          this.trainingservice.completeExercise(step);
          clearInterval(this.timer);
        }

    }, step);
  }


  onStop() {

  clearInterval(this.timer);
  const dailogRef = this.dialog.open(StopTrainingComponent, {
    data: {
      progress: this.progress
    }
  });

  dailogRef.afterClosed().subscribe(result => {
    if (result) { 
      this.trainingExit.emit(result);
      this.trainingservice.cancelExercise(this.progress);
    }
    else { 
      this.startorResumeTraining(); }
    });

  }
}
