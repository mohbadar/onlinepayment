import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-agent-slip-print',
  templateUrl: './agent-slip-print.component.html',
  styleUrls: ['./agent-slip-print.component.scss']
})
export class AgentSlipPrintComponent implements OnInit {

  item: any;
    isPrinting = false;

    constructor(
        public dialogRef: MatDialogRef<AgentSlipPrintComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.item = this.data.item;
        console.log("Item", this.item);
        this.isPrinting = true;
    }

    ngOnInit(): void {
    }

    //DABS361846
}
