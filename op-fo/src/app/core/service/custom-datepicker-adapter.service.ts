import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TypesUtilsService } from 'app/core/_base/crud';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

    readonly DELIMITER = '/';

    constructor(private typesUtilsService:TypesUtilsService){
        super();
    }

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                year: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                day: parseInt(date[2], 10)
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.year + this.DELIMITER + this.typesUtilsService.padNumber(date.month) + this.DELIMITER + this.typesUtilsService.padNumber(date.day) : '';
    }
}