using EmployeeAPI.Data;
using EmployeeAPI.Repositories.IRepositories;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EmployeeAPI.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly DataContext _context;
        private readonly DbSet<Department> _dbSet;

        public DepartmentRepository(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<Department>();
        }

        public virtual async Task CreateAsync(Department department)
        {
            department.Id = Guid.NewGuid();
            await _dbSet.AddAsync(department);
            await _context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(Department department)
        {
            _dbSet.Remove(department);
            await _context.SaveChangesAsync();
        }

        public virtual async Task<IEnumerable<Department>> ReadAllAsync(Expression<Func<Department, bool>> filter = null)
        {
            var query = _dbSet.AsQueryable();

            if (filter != null)
            {
                query = query.Where(filter).AsNoTracking();
            }

            return await query.Include(x => x.Employees).ToListAsync();
        }

        public virtual async Task<Department> ReadByIdAsync(Guid id)
        {
            return await _dbSet.Include(x => x.Employees).FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task UpdateAsync(Department department)
        {
            _dbSet.Attach(department);
            _context.Entry<Department>(department).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
