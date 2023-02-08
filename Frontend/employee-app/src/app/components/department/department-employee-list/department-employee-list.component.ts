import { LoaderService } from './../../../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-employee-list',
  templateUrl: './department-employee-list.component.html',
  styleUrls: ['./department-employee-list.component.scss'],
})
export class DepartmentEmployeeListComponent implements OnInit {
  id: string = this.route.snapshot.paramMap.get('id')!;
  department: Department = {
    name: "",
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.departmentService.readById(this.id).subscribe((department) => {
      this.department = department;
      console.log(this.department);
    });
  }

  navigateToDepartments(): void {
    this.router.navigate(['/departments']);
  }

  formattedBirthday(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }
}
