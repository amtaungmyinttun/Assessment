using GIC.Domain.Entities;

namespace GIC.Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IList<Employee>> GetList(int? cafeId);
        Task<Employee?> Get(int Id);
        Task AddAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(Employee employee);
    }
}
