
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Subscription, merge, of } from 'rxjs';
import { tap, take, delay } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { ProvinceService } from '../../service/province.service';
import { LayoutUtilsService, MessageType } from '../../../../../../core/_base/crud';
import { Router } from '@angular/router';
import { ViewProvinceComponent } from '../view-province/view-province.component';
import { DataExchangeService } from '../../../../../../core/service/data.exchange.service';
import { ProvinceUserRelationComponent } from '../province-user-relation/province-user-relation.component';

@Component({
  selector: 'kt-list-province',
  templateUrl: './list-province.component.html',
})
export class ListProvinceComponent implements OnInit {


  displayedColumns: string[] = [ 'name', 'ProvinceCode', "Status" ,'actions'];
	dataSource: MatTableDataSource<any>;
  
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private provinceService: ProvinceService,
		private layoutUtilsService: LayoutUtilsService,
		public dialog: MatDialog,
    private router: Router,
    private dataExchangeService: DataExchangeService
  ) { }

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
		const _title: string = 'Province';
		const _description: string = 'Are you sure to permanently delete?';
		const _waitDesciption: string = 'deleting...';
		const _deleteMessage = `Object has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
      
			if (!res) {
				return;
      }

      this.provinceService.delete(_item.id).subscribe((response) => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.reloadData();
      });
			
		});
	}

  add()
  {
    
		this.router.navigate(['/province/add']);
  }

  reloadData()
  {
    this.provinceService.get().subscribe((data) => {	
          console.log("provinces: ", data)	
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
    const dialogRef = this.dialog.open(ViewProvinceComponent,{ data: { item: item } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
    	    }
		});
  }

  addProvinceUserRelation(item) {
    const dialogRef = this.dialog.open(ProvinceUserRelationComponent,{ data: { item: item } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
    	    }
		});
  }


  update(item) {
    this.dataExchangeService.changeData(item);
    this.router.navigate(['/province/update']);
  }

}
