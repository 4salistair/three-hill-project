import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';


@NgModule({
    declarations: [ TrainingComponent,
                    NewTrainingComponent,
                    PastTrainingComponent,
                    CurrentTrainingComponent,
                    CurrentTrainingComponent,
                    StopTrainingComponent,
                     ],
    imports: [      CommonModule,
                    ReactiveFormsModule,
                    SharedModule,
                    MaterialModule,
                    FlexLayoutModule,
                    FormsModule,
                    TrainingRoutingModule,
                    AgmCoreModule.forRoot({
                          apiKey: environment.GoogleMapsKey
                      })
                     ],
    exports: [],
    providers: [],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {}
