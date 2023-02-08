namespace EmployeeAPI.Models
{
    public class Employee
    {
        public Employee(Guid id, string name, string surname, double salary, DateTime birthday, Guid departmentId)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Salary = salary;
            Birthday = birthday;
            DepartmentId = departmentId;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public double Salary { get; set; }
        public DateTime Birthday { get; set; }
        public Guid DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}
