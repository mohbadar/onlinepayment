
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
import { BillTypeService } from '../../service/bill-type.service';
import { ViewBilltypeComponent } from '../view-billtype/view-billtype.component';

@Component({
  selector: 'kt-list-billtype',
  templateUrl: './list-billtype.component.html',
  styleUrls: ['./list-billtype.component.scss']
})
export class ListBilltypeComponent implements OnInit {

  
  displayedColumns: string[] = [ 'name', "Status" ,'actions'];
	dataSource: MatTableDataSource<any>;
  
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private billTypeService: BillTypeService,
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
		const _title: string = 'BillType';
		const _description: string = 'Are you sure to permanently delete?';
		const _waitDesciption: string = 'deleting...';
		const _deleteMessage = `Object has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
      
			if (!res) {
				return;
      }

      this.billTypeService.delete(_item.id).subscribe((response) => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.reloadData();
      });
			
		});
	}

  add()
  {
    
		this.router.navigate(['/bill-type/add']);
  }

  reloadData()
  {
    this.billTypeService.get().subscribe((data) => {	
          console.log("fee: ", data)	
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
    const dialogRef = this.dialog.open(ViewBilltypeComponent,{ data: { item: item } });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
    	    }
		});
  }



  update(item) {
    this.dataExchangeService.changeData(item);
    this.router.navigate(['/bill-type/update']);
  }

}
