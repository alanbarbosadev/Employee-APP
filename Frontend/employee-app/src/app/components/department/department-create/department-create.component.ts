import { LoaderService } from './../../../services/loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss'],
})
export class DepartmentCreateComponent implements OnInit {
  department: Department = {
    name: '',
  };

  departmentCreateForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {}

  createDepartment(): void {
    const formData = this.departmentCreateForm.value;
    let department: Department = {
      name: formData.name,
    };
    this.departmentService.create(department).subscribe(() => {
      this.router.navigate(['/departments']);
      this.departmentService.showMessage("Department Registered Sucessfully!");
    });
  }

  cancel() {
    this.router.navigate(['/departments']);
  }
}
