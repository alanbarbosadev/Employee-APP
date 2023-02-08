using EmployeeAPI.Models;
using System.Linq.Expressions;

namespace EmployeeAPI.Repositories.IRepositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> ReadAllAsync(Expression<Func<Employee, bool>> filter = null);
        Task<Employee> ReadByIdAsync(Guid id);
        Task CreateAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(Employee employee);
    }
}
