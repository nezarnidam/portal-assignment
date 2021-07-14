import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/employee/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/employee/shared/header/header.component';
import { SidebarComponent } from 'src/app/employee/shared/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatExpansionModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    FooterComponent,

    HeaderComponent,

    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatExpansionModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
