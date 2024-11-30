using GIC.Application.Interfaces;
using GIC.Domain.Entities;
using GIC.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GIC.Application.Repositories
{
    public class CafeRepository : ICafeRepository
    {
        private readonly GICDbContext _context;

        public CafeRepository(GICDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Cafe>> GetList(string? location)
        {
            IQueryable<Cafe> query = _context.Cafes.Include(x => x.Employees);

            if (location is not null)
            {
                query = query.Where(x => x.Location == location);
            }

            return await query.ToListAsync();
        }

        public async Task<Cafe?> Get(int id)
        {
            return await _context.Cafes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddAsync(Cafe cafe)
        {
            await _context.Cafes.AddAsync(cafe);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Cafe cafe)
        {
            _context.Cafes.Update(cafe);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Cafe cafe)
        {
            _context.Cafes.Remove(cafe);
            await _context.SaveChangesAsync();
        }
    }
}
