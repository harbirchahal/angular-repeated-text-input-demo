import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface T {
  key: string;
  value: string;
}
const NO_EMIT = { emitEvent: false };
const EMPTY: T = { key: '', value: '' };

@Component({
  selector: 'lib-repeated-pair-input',
  templateUrl: './repeated-pair-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RepeatedPairInputComponent),
      multi: true,
    },
  ],
})
export class RepeatedPairInputComponent
  implements ControlValueAccessor, OnInit
{
  @Input() fieldGrid: boolean = false;

  readonly formArray = this.fb.array([]);
  readonly pairForm = this.fb.group({
    pairs: this.formArray,
  });

  inputChanged = (v: T[]) => {};
  inputTouched = () => {};

  get controls(): FormControl[] {
    return this.formArray.controls as FormControl[];
  }

  constructor(readonly fb: FormBuilder) {
    this.writeValue(null);
  }

  ngOnInit() {
    this.formArray.valueChanges.subscribe((values: T[]) => {
      this.inputChanged(values.filter(({ key }) => !!key));
    });
  }

  writeValue(values: T[] | null) {
    this.formArray.clear(NO_EMIT);
    if (values?.length) {
      for (const value of values) {
        this.addItem(value);
      }
    } else {
      this.addItem();
    }
  }

  registerOnChange(fn: (v: T[]) => void) {
    this.inputChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.inputTouched = fn;
  }

  createItem(value: T = EMPTY): FormGroup {
    return this.fb.group(value);
  }

  addItem(value: T = EMPTY) {
    this.formArray.push(this.createItem(value), NO_EMIT);
  }

  removeAt(index: number) {
    this.formArray.removeAt(index);
  }
}
