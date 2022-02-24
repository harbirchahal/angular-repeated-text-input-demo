import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { RepeatedPairInputComponent } from './repeated-pair-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
  ],
  declarations: [RepeatedPairInputComponent],
  exports: [RepeatedPairInputComponent],
})
export class RepeatedPairInputModule {}
