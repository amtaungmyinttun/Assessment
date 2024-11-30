using GIC.Application.DTOs.Response;
using GIC.Application.Interfaces;
using GIC.Application.Queries;
using GIC.Domain.Entities;
using MediatR;

namespace GIC.Application.QueryHandler.EmployeeQueryHandler
{
    public class CafeListQueryHandler : IRequestHandler<EmployeeListQuery, IList<EmployeeResponseDto>>
    {
        private readonly IEmployeeRepository _repository;

        public CafeListQueryHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IList<EmployeeResponseDto>> Handle(EmployeeListQuery query, CancellationToken cancellationToken)
        {
            var employees = await _repository.GetList(query.cafeId);

            return employees
                .Select(
                    x => new EmployeeResponseDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        EmailAddress = x.EmailAddress,
                        PhoneNumber = x.PhoneNumber,
                        Gender = x.Gender,
                        CafeId = x.CafeId,
                        CafeName = x.Cafe?.Name ?? string.Empty,
                        StartDate = x.StartDate,
                    }
                )
                .OrderByDescending(x => x.DayWorked)
                .ToList();
        }
    }
}
