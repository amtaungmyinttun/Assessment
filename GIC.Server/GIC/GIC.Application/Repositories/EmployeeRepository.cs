using GIC.Application.Interfaces;
using GIC.Domain.Entities;
using GIC.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GIC.Application.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly GICDbContext _context;

        public EmployeeRepository(GICDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Employee>> GetList(int? cafeId)
        {
            IQueryable<Employee> query = _context.Employees.Include(x => x.Cafe);

            if (cafeId is not null)
            {
                cafeId = cafeId == 0 ? null : cafeId;
                query = query.Where(x => x.CafeId == cafeId);
            }

            return await query.ToListAsync();
        }

        public async Task<Employee?> Get(int id)
        {
            return await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}
