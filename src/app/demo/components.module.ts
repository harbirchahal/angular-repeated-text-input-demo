import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NestedPairInputModule,
  RepeatedPairInputModule,
} from '../shared/components';
import { NestedPairDemoComponent } from './nested-pair-demo';
import { RepeatedPairDemoComponent } from './repeated-pair-demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NestedPairInputModule,
    RepeatedPairInputModule,
  ],
  declarations: [NestedPairDemoComponent, RepeatedPairDemoComponent],
  exports: [NestedPairDemoComponent, RepeatedPairDemoComponent],
})
export class ComponentsModule {}
