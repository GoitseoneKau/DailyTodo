import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class PhoneNumberValidator {//export validator function
    static phoneValidator(): ValidatorFn {
        //regex 10 digit phone numbers,sperated by space or -
        const reg = new RegExp("^([^1-9]([0-9]{2}))\\s([0-9]{3})\\s([0-9]{4})|([^1-9]([0-9]{2}))-([0-9]{3})-([0-9]{4})$");
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = reg.test(control.value)//check if tet is true
            return !isValid ? {invalidPhone: true } : null;//if test is false return error
        };
      }
}
