// Angular
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { KeycloakService } from 'keycloak-angular';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
	selector: 'kt-quick-action',
	templateUrl: './quick-action.component.html',
})
export class QuickActionComponent implements OnInit, AfterViewInit {
	// Public properties

	// Set icon class name
	@Input() icon: string = 'flaticon2-gear';

	@Input() iconType: '' | 'warning';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() gridNavSkin: 'light' | 'dark' = 'light';

	/**
	 * Component constructor
	 */
	constructor(
		private keycloakService: KeycloakService,
		public dialog: MatDialog
	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
	}

	onSVGInserted(svg) {
		svg.classList.add('kt-svg-icon', 'kt-svg-icon--success', 'kt-svg-icon--lg');
	}

	logout() {
		console.log("Logout");

		this.keycloakService.logout();

	}

	changePassword() {
		const dialogRef = this.dialog.open(ChangePasswordComponent);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
		});
	}
}
