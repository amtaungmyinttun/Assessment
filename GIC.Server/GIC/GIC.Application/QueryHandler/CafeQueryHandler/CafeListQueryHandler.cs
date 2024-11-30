using GIC.Application.DTOs.Response;
using GIC.Application.Interfaces;
using GIC.Application.Queries;
using GIC.Domain.Entities;
using MediatR;

namespace GIC.Application.QueryHandler.CafeQueryHandler
{
    public class CafeListQueryHandler : IRequestHandler<CafeListQuery, IList<CafeResponseDto>>
    {
        private readonly ICafeRepository _repository;

        public CafeListQueryHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task<IList<CafeResponseDto>> Handle(CafeListQuery query, CancellationToken cancellationToken)
        {
            var cafes = await _repository.GetList(query.location);

            return cafes
                .Select(
                    x => new CafeResponseDto()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Logo = x.Logo,
                        Location = x.Location,
                        EmployeeCount = x.Employees.Count,
                    }
                )
                .OrderByDescending(x => x.EmployeeCount)
                .ToList();
        }
    }
}
