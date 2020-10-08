import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import {CdkTableModule} from '@angular/cdk/table';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
    {
        path: '',
        component: EmployeeComponent
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
        FormsModule
    ],
    entryComponents: [
        EmployeeFormComponent
    ],

    declarations: [
        EmployeeComponent,
        EmployeeFormComponent

    ],
    providers: [
        EmployeeService
    ]
})

export class EmployeeModule {
}