import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['snack-bar'],
    });
  }

  create(department: Department): Observable<Department> {
    return this.http.post<Department>(environment.departmentBaseUrl, department);
  }

  read(): Observable<Department[]> {
    return this.http.get<Department[]>(environment.departmentBaseUrl);
  }

  readById(id: string): Observable<Department> {
    const url = `${environment.departmentBaseUrl}/ById/${id}`;
    return this.http.get<Department>(url);
  }

  update(department: Department): Observable<Department> {
    const url = `${environment.departmentBaseUrl}/${department.id}`;
    return this.http.put<Department>(url, department);
  }

  delete(id: string): Observable<Department> {
    const url = `${environment.departmentBaseUrl}/${id}`;
    return this.http.delete<Department>(url);
  }
}
