import { Department } from "./department.model";

export interface Employee {
  id?: string;
  name: string;
  surname: string;
  salary: number;
  birthday: Date;
  departmentId: number;
  department?: Department;
}
