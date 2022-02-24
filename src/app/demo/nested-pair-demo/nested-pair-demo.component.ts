import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValuePair, valuePairParse } from '@app/shared/models';

@Component({
  selector: 'app-nested-pair-demo',
  templateUrl: './nested-pair-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedPairDemoComponent {
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
  const str =
    "{'horizon':'3','resources':{'requests':{'cpu':'200m','memory':'1024Mi'}}}";
  return valuePairParse(str);
}
