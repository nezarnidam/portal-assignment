import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmployeedashComponent } from './employeedash.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatTableModule, MatIconModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../shared/shared.module';
import { EmployeeprofileComponent } from '../modules/employeeprofile/employeeprofile.component';
import { EmployeeleaveComponent } from '../modules/employeeleave/employeeleave.component';
import { EmployeepayslipComponent } from '../modules/employeepayslip/employeepayslip.component';
import { EmployeesettlementComponent } from '../modules/employeesettlement/employeesettlement.component';
import { EmployeeleavecreateComponent } from '../modules/employeeleavecreate/employeeleavecreate.component';

@NgModule({
  declarations: [
    EmployeedashComponent,
    EmployeeprofileComponent,
    EmployeeleaveComponent,
    EmployeeleavecreateComponent,
    EmployeepayslipComponent,
    EmployeesettlementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [
    DatePipe
  ]
})
export class EmployeedashModule { }
