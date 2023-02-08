import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackBar.open(message, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['snack-bar'],
    });
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.employeeBaseUrl, employee);
  }

  read(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.employeeBaseUrl);
  }

  readById(id: string): Observable<Employee> {
    const url = `${environment.employeeBaseUrl}/ById/${id}`;
    return this.http.get<Employee>(url);
  }

  update(employee: Employee): Observable<Employee> {
    const url = `${environment.employeeBaseUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }

  delete(id: string): Observable<Employee> {
    const url = `${environment.employeeBaseUrl}/${id}`;
    return this.http.delete<Employee>(url);
  }
}
