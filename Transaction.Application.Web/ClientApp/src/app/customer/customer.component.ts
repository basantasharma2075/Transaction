import { Component, OnInit } from '@angular/core';
import { MvCustomer, MvNewCustomer } from './customer.model';
import { CustomerService } from './customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvCustomer>;
  selectedCustomer: MvNewCustomer = <MvNewCustomer>{};
  selection = new SelectionModel<MvCustomer>(false, []);

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['OrganizationId','CustomerId', 'OrganizationName', 'Address', 'Phone', 'Email'];
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.customerService.getAllCustomerDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvCustomer>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvCustomer>();;
        this.userMessage = 'No Customer available !';
      }
    });

  }

  addCustomer(){
    this.selection.clear();
    this.selectedCustomer = <MvCustomer>{};
    this.openDialog('Add');
  }

  editCustomer(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedCustomer, action: action };
    const dialogRef = this.dialog.open(CustomerFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.customerService.updateCustomer(result).subscribe(res => {
            this.getAllCustomers();
          });

        } else {
          this.customerService.addCustomer(result).subscribe(res => {
            this.getAllCustomers();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvCustomer) {
    this.selectedCustomer = { ...row };
    this.selection.toggle(row);
  }





}
