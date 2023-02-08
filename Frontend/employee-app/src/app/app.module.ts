import { InterceptorService } from './services/interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';
import { DepartmentCrudComponent } from './pages/department-crud/department-crud.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentEmployeeListComponent } from './components/department/department-employee-list/department-employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EmployeeCrudComponent,
    DepartmentCrudComponent,
    EmployeeCreateComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    EmployeeEditComponent,
    DepartmentEmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
