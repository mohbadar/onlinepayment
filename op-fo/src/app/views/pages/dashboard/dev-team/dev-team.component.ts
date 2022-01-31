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
