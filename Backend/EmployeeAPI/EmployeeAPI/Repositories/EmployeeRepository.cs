using EmployeeAPI.Data;
using EmployeeAPI.Models;
using EmployeeAPI.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EmployeeAPI.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly DbSet<Employee> _dbSet;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<Employee>();
        }

        public virtual async Task CreateAsync(Employee employee)
        {
            employee.Id = Guid.NewGuid();
            await _dbSet.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(Employee employee)
        {
            _dbSet.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public virtual async Task<IEnumerable<Employee>> ReadAllAsync(Expression<Func<Employee, bool>> filter = null)
        {
            var query = _dbSet.AsQueryable();

            if (filter != null)
            {
                query = query.Where(filter).AsNoTracking();
            }

            return await query.Include(x => x.Department).ToListAsync();
        }

        public virtual async Task<Employee> ReadByIdAsync(Guid id)
        {
            return await _dbSet.Include(x => x.Department).FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task UpdateAsync(Employee employee)
        {
            _dbSet.Attach(employee);
            _context.Entry<Employee>(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
