import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TreeModule } from 'primeng/tree';

import { NestedPairInputComponent } from './nested-pair-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TreeModule,
  ],
  declarations: [NestedPairInputComponent],
  exports: [NestedPairInputComponent],
})
export class NestedPairInputModule {}
