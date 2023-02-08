import { DepartmentService } from './../../../services/department.service';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  departments: Department[] = [];
  employeeCreateForm: FormGroup;

 // employeeCreateForm: FormGroup = new FormGroup({
 //   name: new FormControl(null, [Validators.required]),
 //   surname: new FormControl(null, [Validators.required]),
 //   salary: new FormControl(null, [Validators.required]),
 //   birthday: new FormControl(null, [Validators.required]),
 //   departmentId: new FormControl(null, [Validators.required]),
 // });

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    public loaderService: LoaderService,
    private formBuilder: FormBuilder,
  ) {this.employeeCreateForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    salary: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    departmentId: [null, [Validators.required]],
  })}

  ngOnInit(): void {
    this.departmentService.read().subscribe((departments) => {
      this.departments = departments;
    });
  }

  registerEmployee(): void {
    const formData = this.employeeCreateForm.value;
    let employee: Employee = {
      name: formData.name,
      surname: formData.surname,
      salary: formData.salary,
      birthday: formData.birthday,
      departmentId: formData.departmentId,
    };
    this.employeeService.create(employee).subscribe(() => {
      this.router.navigate(['/employees']);
      this.employeeService.showMessage("Employee Registered Sucessfully!");
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
