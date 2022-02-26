
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subscription, merge, of } from 'rxjs';
import { tap, take, delay } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { Router } from '@angular/router';
import { DataExchangeService } from '../../../../../../core/service/data.exchange.service';
import { CenterService } from '../../service/center.service';
import { CenterUserRelationComponent } from '../center-user-relation/center-user-relation.component';
import { ViewCenterComponent } from '../view-center/view-center.component';
import { KeycloakService } from 'keycloak-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-list-center',
  templateUrl: './list-center.component.html',
})
export class ListCenterComponent implements OnInit {


  displayedColumns: string[] = [ 'name', 'code', "Status" ,'actions'];
	dataSource: MatTableDataSource<any>;
  
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private centerService: CenterService,
		private layoutUtilsService: LayoutUtilsService,
		public dialog: MatDialog,
    private router: Router,
    private dataExchangeService: DataExchangeService,
    private keycloakService: KeycloakService,
    private translate: TranslateService
  ) {
    if (!this.keycloakService.isUserInRole('create_center')) {
      this.router.navigate(['/'])
      this.layoutUtilsService.showActionNotification(this.translate.instant('UN_AUTHORIZED_ACCESS'));
    }
   }

  ngOnInit() {
      this.reloadData();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  	/**
	 * Delete 
	 *
	 * @param _item: 
	 */
	delete(_item) {
		const _title: string = 'Center';
		const _description: string = 'Are you sure to permanently delete?';
		const _waitDesciption: string = 'deleting...';
		const _deleteMessage = `Object has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
      
			if (!res) {
				return;
      }

      this.centerService.delete(_item.id).subscribe((response) => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.reloadData();
      });
			
		});
	}

  add()
  {
    
		this.router.navigate(['/center/add']);
  }

  reloadData()
  {
    this.centerService.get().subscribe((data) => {	
          console.log("orgs: ", data)	
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    });
  }

  processStatus(status)
  {
      if(status == true)
      {
        return "Deleted"
      }
  }


  view(item) {
    const dialogRef = this.dialog.open(ViewCenterComponent,{ data: { item: item } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
    	    }
		});
  }

  addCenterUserRelation(item) {
    const dialogRef = this.dialog.open(CenterUserRelationComponent,{ data: { item: item } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
    	    }
		});
  }


  update(item) {
    this.dataExchangeService.changeData(item);
    this.router.navigate(['/center/update']);
  }

}
