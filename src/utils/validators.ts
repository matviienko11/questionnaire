import {AbstractControl, FormArray, ValidatorFn} from "@angular/forms";

export function minLength(min: number): ValidatorFn | any {
  return (control: AbstractControl[]) => {
    if (!(control instanceof FormArray)) return;
    return control.length < min ? { minLength: true } : null;
  }
}
