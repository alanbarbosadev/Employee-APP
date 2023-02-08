import { LoaderService } from './../../services/loader.service';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.scss'],
})
export class EmployeeCrudComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.employeeService.read().subscribe((employees) => {
      this.employees = employees;
    });
  }

  navigateToCreateEmployee() {
    this.router.navigate(['/employee/create']);
  }

  formattedBirthday(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  delete(employee: Employee): void {
    const id = employee.id?.toString()!;
    this.employeeService.delete(id).subscribe(() => {
      this.employeeService.read().subscribe((employees) => {
        this.employees = employees;
        this.employeeService.showMessage("Employee Deleted Sucessfully!");
      });
    });
  }
}
