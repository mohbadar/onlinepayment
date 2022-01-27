// Angular
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
// Angular
import { } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
import { Breadcrumb, SubheaderService } from '../../../../core/_base/layout/services/subheader.service';
import { TranslateService } from '@ngx-translate/core';
// Layout

@Component({
  selector: 'kt-dev-team',
  templateUrl: './dev-team.component.html',
  styleUrls: ['./dev-team.component.scss']
})
export class DevTeamComponent implements OnInit {

  // Public properties
    // @Input() fluid: boolean;
    // @Input() clear: boolean;

    fluid = true;
    clear = true;
    today: number = Date.now();
    title: string = '';
    desc: string = '';
    breadcrumbs: Breadcrumb[] = [];
    modules = [
        
        {
            id: 1,
            name: 'Mohammad Badar Hashimi',
            position: 'Director / Team Lead / Engineer',
            icon: 'badar.jpg',
            link: 'https://github.com/mohbadar'
        },

        
        {
            id: 1,
            name: 'Mirwais Akrami',
            position: 'Engineer',
            icon: 'akrami.jpg',
            link: 'https://github.com/MirwaisAkrami'
        },

        
        {
            id: 1,
            name: 'Jamila Maqsoudi',
            position: 'Engineer',
            icon: 'jamila.jpg',
            link: 'https://github.com/jmaqsoudi'
        },

        
        {
            id: 1,
            name: 'Safiullah Ahmadzai',
            position: 'Engineer',
            icon: 'safi.jpg',
            link: 'https://github.com/SafiAhmadzai'
        },

                
        {
            id: 1,
            name: 'Sediqa Mousavi',
            position: 'Engineer',
            icon: 'sediqa.jpg',
            link: 'https://github.com/sediqamousavi'
        },

                
        {
            id: 1,
            name: 'Walid Mashal',
            position: 'Engineer',
            icon: 'mashal.jpg',
            link: 'https://github.com/walid-mashal'
        },

    

        {
            id: 1,
            name: 'Suhrab Ahadi',
            position: 'Mobile Engineer',
            icon: 'suhrab.jpg',
            link: 'https://github.com/SuhrabAhdi'
        },
    ]

    // Private properties
    private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
    constructor(public subheaderService: SubheaderService, private translate: TranslateService) {
    }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
    ngOnInit() {
    }

	/**
	 * After view init
	 */
    ngAfterViewInit(): void {
        this.subscriptions.push(this.subheaderService.title$.subscribe(bt => {
            // breadcrumbs title sometimes can be undefined
            if (bt) {
                Promise.resolve(null).then(() => {
                    this.title = bt.title;
                    this.desc = bt.desc;
                });
            }
        }));

        this.subscriptions.push(this.subheaderService.breadcrumbs$.subscribe(bc => {
            Promise.resolve(null).then(() => {
                this.breadcrumbs = bc;
            });
        }));
    }

	/**
	 * On destroy
	 */
    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }
}
