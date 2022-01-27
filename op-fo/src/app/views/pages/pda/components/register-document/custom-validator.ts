import { FormControl, ValidatorFn } from "@angular/forms";

export class CustomValidator {
  static customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }

  static validateFile(config: any): ValidatorFn {
    return (control: FormControl) => {
      let file = config.file;
      let ext = file.substring(file.lastIndexOf(".") + 1);
      if (control.value && !control.value.match(ext)) {
        return {
          invalidMsg: config.msg,
        };
      } else {
        return null;
      }
    };
  }
}
