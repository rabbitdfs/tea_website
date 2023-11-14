import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {
  static nameValidator(control: AbstractControl): ValidationErrors | null {
    const result = /[A-ZА-Я][a-zа-я]+$/.test(control.value);
    return result ? null: {name: {value: control.value}}
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^(\+?\d{11}|\d{10})$/.test(control.value);
    return result ? null: {phone: {value: control.value}}
  }

  static addressValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^[a-zA-Z0-9\s/-]*$/.test(control.value);
    return result ? null: {address: {value: control.value}}
  }

  static zipValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^\d{5}(?:[-\s]\d{4})?$/.test(control.value);
    return result ? null: {zip: {value: control.value}}
  }


}
