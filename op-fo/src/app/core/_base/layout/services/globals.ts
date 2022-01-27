 
import { Injectable } from '@angular/core';
import { Principal } from 'app/core/common-models/principal.model';

@Injectable({
	providedIn: 'root'
})
export class Globals {
    lang: string = 'en';
    dir: string = 'ltr';

    dark: boolean = false;
    boxed:  boolean =false;
    collapsed:  boolean =false;
    landing_page;

    principal: Principal = new Principal(null, [], []);
}