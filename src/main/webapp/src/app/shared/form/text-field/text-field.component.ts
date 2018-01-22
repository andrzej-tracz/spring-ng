import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {AbstractControlValueAccessor} from '../abstract-control-value-accessor';


export const CUSTOM_TEXTFIELD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFieldComponent),
  multi: true
};

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    CUSTOM_TEXTFIELD_CONTROL_VALUE_ACCESSOR
  ]
})
export class TextFieldComponent extends AbstractControlValueAccessor {

  @Input() label: string;

  @Input() set value(v: any) {
    this._value = v;
    this.onChangeCallback(v);
  }

  get value(): any {
    return this._value;
  };
}
