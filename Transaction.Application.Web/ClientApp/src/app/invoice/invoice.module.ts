import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceService } from './invoice.service';
import {CdkTableModule} from '@angular/cdk/table';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '../shared/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
    {
        path: '',
        component: InvoiceComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatToolbarModule,
        MatFormFieldModule,
        HttpClientModule,
        ReactiveFormsModule,
        CdkTableModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        MaterialModule,
        MatCheckboxModule
    ],
    entryComponents: [
        InvoiceFormComponent
    ],

    declarations: [
        InvoiceComponent,
        InvoiceFormComponent

    ],
    providers: [
        InvoiceService
    ]
})

export class InvoiceModule {
}