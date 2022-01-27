import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TypesUtilsService } from 'app/core/_base/crud';
/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';
    constructor(private typesUtilsService:TypesUtilsService){
        super();
    }
    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                year: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                day: parseInt(date[2], 10),
            };
        }
        return null;
    }


    format(date: NgbDateStruct | null): string {
        return date ? date.year + this.DELIMITER + this.typesUtilsService.padNumber(date.month) + this.DELIMITER + this.typesUtilsService.padNumber(date.day) : '';
    }
}