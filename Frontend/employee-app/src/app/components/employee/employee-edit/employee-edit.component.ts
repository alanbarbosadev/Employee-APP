import { LoaderService } from './../../../services/loader.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './../../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Employee } from 'src/app/models/employee.model';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id')!;
  departments: Department[] = [];
  employeeEditForm: FormGroup;

  //employeeEditForm: FormGroup = new FormGroup({
  //  id: new FormControl(this.id, [Validators.required]),
  //  name: new FormControl(null, [Validators.required]),
  //  surname: new FormControl(null, [Validators.required]),
  //  salary: new FormControl(null, [Validators.required]),
  //  birthday: new FormControl(null, [Validators.required]),
  //  departmentId: new FormControl(null, [Validators.required]),
  //});

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService,
    private formBuilder: FormBuilder
  ) {
    this.employeeEditForm = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.departmentService.read().subscribe((departments) => {
      this.departments = departments;
      this.employeeService.readById(this.id).subscribe((employee) => {
        this.employeeEditForm.patchValue(employee);
        this.employeeEditForm
          .get('birthday')!
          .patchValue(moment(employee.birthday).format('YYYY-MM-DD'));
      });
    });
  }

  updateEmployee(): void {
    const formData = this.employeeEditForm.value;
    let employee: Employee = {
      id: formData.id,
      name: formData.name,
      surname: formData.surname,
      salary: formData.salary,
      birthday: formData.birthday,
      departmentId: formData.departmentId,
    };
    this.employeeService.update(employee).subscribe(() => {
      this.router.navigate(['/employees']);
      this.employeeService.showMessage("Employee Updated Sucessfully!");
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
