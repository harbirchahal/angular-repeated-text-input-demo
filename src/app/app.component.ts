import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ValuePair, valuePairObjectify } from '@app/shared/models';

interface DemoComponent {
  refreshData();
  clearData();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('repeatedPairDemo') repeatedPairDemo: DemoComponent;
  @ViewChild('nestedPairDemo') nestedPairDemo: DemoComponent;

  selectedTab = 0;
  readonly tabs: Array<{ component?: DemoComponent; value?: string }>;

  get output() {
    return this.tabs[this.selectedTab]?.value;
  }

  constructor() {
    this.tabs = [{}, {}];
  }

  ngAfterViewInit() {
    this.tabs[0].component = this.repeatedPairDemo;
    this.tabs[1].component = this.nestedPairDemo;
  }

  tabChange(index: number) {
    this.selectedTab = index;
  }

  valueChange(index: number, pairs: ValuePair[]) {
    this.tabs[index].value = JSON.stringify(valuePairObjectify(pairs), null, 4);
  }

  refreshData() {
    this.tabs[this.selectedTab].component.refreshData();
  }

  clearData() {
    this.tabs[this.selectedTab].component.clearData();
  }
}
