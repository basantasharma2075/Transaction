 import { Component, OnInit } from '@angular/core';
import { MvInvoice, MvNewInvoice } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvInvoice>;
  selectedInvoice: MvNewInvoice = <MvNewInvoice>{};
  selection = new SelectionModel<MvInvoice>(false, []);

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['InvoiceId','CustomerId', 'EmployeeId', 'TransactionId', 'Amount'];
    this.getAllInvoices();
  }
  getAllInvoices() {
    this.invoiceService.getAllInvoiceDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvInvoice>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvInvoice>();;
        this.userMessage = 'No Invoice available !';
      }
    });

  }

  addInvoice(){
    this.selection.clear();
    this.selectedInvoice = <MvInvoice>{};
    this.openDialog('Add');
  }

   openDialog(action: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedInvoice, action: action };
    const dialogRef = this.dialog.open(InvoiceFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Add'){
          
          this.invoiceService.addInvoice(result).subscribe(res => {
            this.getAllInvoices();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvInvoice) {
    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }





}
