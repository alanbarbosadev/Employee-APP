import { DepartmentService } from './../../services/department.service';
import { Department } from './../../models/department.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-department-crud',
  templateUrl: './department-crud.component.html',
  styleUrls: ['./department-crud.component.scss'],
})
export class DepartmentCrudComponent implements OnInit {
  departments: Department[] = [];

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    public loaderService: LoaderService
  ) {}
  ngOnInit(): void {
    this.departmentService.read().subscribe((departments) => {
      this.departments = departments;
    });
  }

  navigateToCreateDepartment() {
    this.router.navigate(['department/create']);
  }

  delete(department: Department): void {
    const id = department.id?.toString()!;
    this.departmentService.delete(id).subscribe(() => {
      this.departmentService.read().subscribe((departments) => {
        this.departments = departments;
        this.departmentService.showMessage("Department Deleted Sucessfully!");
      });
    });
  }
}
