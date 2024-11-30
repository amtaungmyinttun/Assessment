using GIC.Domain.Entities;

namespace GIC.Application.Interfaces
{
    public interface ICafeRepository
    {
        Task<IList<Cafe>> GetList(string? location);
        Task<Cafe?> Get(int Id);
        Task AddAsync(Cafe cafe);
        Task UpdateAsync(Cafe cafe);
        Task DeleteAsync(Cafe cafe);
    }
}
