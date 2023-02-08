import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from './../../../services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from './../../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss'],
})
export class DepartmentEditComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id')!;

  departmentEditForm: FormGroup = new FormGroup({
    id: new FormControl(this.id, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.departmentService.readById(this.id).subscribe((department) => {
      this.departmentEditForm.patchValue(department);
    });
  }

  editDepartment(): void {
    const formData = this.departmentEditForm.value;
    let department: Department = {
      id: formData.id,
      name: formData.name,
    };
    this.departmentService.update(department).subscribe(() => {
      this.router.navigate(['/departments']);
      this.departmentService.showMessage("Department Updated Sucessfully!");
    });
  }

  cancel(): void {
    this.router.navigate(['/departments']);
  }
}
