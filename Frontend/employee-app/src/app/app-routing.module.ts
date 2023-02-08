import { DepartmentEditComponent } from './components/department/department-edit/department-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCrudComponent } from './pages/employee-crud/employee-crud.component';
import { DepartmentCrudComponent } from './pages/department-crud/department-crud.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { DepartmentCreateComponent } from './components/department/department-create/department-create.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { DepartmentEmployeeListComponent } from './components/department/department-employee-list/department-employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    component: EmployeeCrudComponent,
  },
  {
    path: 'departments',
    component: DepartmentCrudComponent,
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent,
  },
  {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent,
  },
  {
    path: 'department/create',
    component: DepartmentCreateComponent,
  },
  {
    path: 'department/edit/:id',
    component: DepartmentEditComponent,
  },
  {
    path: 'department/employees/:id',
    component: DepartmentEmployeeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
