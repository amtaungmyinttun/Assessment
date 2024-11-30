using GIC.Application.DTOs.Response;
using GIC.Application.Interfaces;
using GIC.Application.Queries;
using MediatR;

namespace GIC.Application.QueryHandler.EmployeeQueryHandler
{
    public class CafeQueryHandler : IRequestHandler<EmployeeQuery, EmployeeResponseDto?>
    {
        private readonly IEmployeeRepository _repository;

        public CafeQueryHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<EmployeeResponseDto?> Handle(EmployeeQuery query, CancellationToken cancellationToken)
        {
            var employee = await _repository.Get(query.Id);
            EmployeeResponseDto? result = null;

            if (employee is not null)
            {
                result = new EmployeeResponseDto()
                {
                    Id = employee.Id,
                    Name = employee.Name,
                    EmailAddress = employee.EmailAddress,
                    PhoneNumber = employee.PhoneNumber,
                    Gender = employee.Gender,
                    CafeId = employee.CafeId,
                    CafeName = employee.Cafe?.Name ?? string.Empty,
                    StartDate = employee.StartDate,
                };
            }

            return result;
        }
    }
}
