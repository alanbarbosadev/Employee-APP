using EmployeeAPI.Models;
using System.Linq.Expressions;

namespace EmployeeAPI.Repositories.IRepositories
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> ReadAllAsync(Expression<Func<Department, bool>> filter = null);
        Task<Department> ReadByIdAsync(Guid id);
        Task CreateAsync(Department department);
        Task UpdateAsync(Department department);
        Task DeleteAsync(Department department);
    }
}
