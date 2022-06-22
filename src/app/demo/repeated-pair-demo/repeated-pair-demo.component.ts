import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValuePair, valuePairParse } from '../../shared/models';

@Component({
  selector: 'app-repeated-pair-demo',
  templateUrl: './repeated-pair-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeatedPairDemoComponent implements OnInit {
  @Output() valueChanges = new EventEmitter<ValuePair[]>();

  readonly inputCtrl = new FormControl();

  constructor() {
    this.inputCtrl.valueChanges.subscribe((value) => {
      this.valueChanges.emit(value);
    });
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.inputCtrl.setValue(getMockData());
  }

  clearData() {
    this.inputCtrl.setValue(null);
  }
}

function getMockData(): ValuePair[] {
  const str = "{'foo':'bar'},{'far':'baz'}";
  return valuePairParse(str);
}
