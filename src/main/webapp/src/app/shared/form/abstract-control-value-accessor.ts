import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractControlValueAccessor implements ControlValueAccessor {

  protected _value: any = '';

  protected onTouchedCallback: () => void = () => {};

  protected onChangeCallback: (_: any) => void = () => {};

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
