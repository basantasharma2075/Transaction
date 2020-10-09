import { Component, OnInit } from '@angular/core';
import { MvTransaction, MvNewTransaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvTransaction>;
  selectedTransaction: MvNewTransaction = <MvNewTransaction>{};
  selection = new SelectionModel<MvTransaction>(false, []);

  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['TransactionId','AssignmentId', 'WorkHours', 'PayPerHour', 'Amount', 'InvoiceId'];
    this.getAllTransactions();
  }
  getAllTransactions() {
    this.transactionService.getAllTransactionDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvTransaction>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvTransaction>();;
        this.userMessage = 'No Transaction available !';
      }
    });

  }

  addTransaction(){
    this.selection.clear();
    this.selectedTransaction = <MvTransaction>{};
    this.openDialog('Add');
  }

  // editTransaction(){
  //   this.openDialog('Edit');
  // }

   openDialog(action: string){
  //   if (action === 'Edit' && !this.selection.hasValue()){
  //     return;
  //   }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedTransaction, action: action };
    const dialogRef = this.dialog.open(TransactionFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Add'){
          
          this.transactionService.addTransaction(result).subscribe(res => {
            this.getAllTransactions();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvTransaction) {
    this.selectedTransaction = { ...row };
    this.selection.toggle(row);
  }





}
