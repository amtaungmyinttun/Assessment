using GIC.Application.DTOs.Response;
using GIC.Application.Interfaces;
using GIC.Application.Queries;
using MediatR;

namespace GIC.Application.QueryHandler.CafeQueryHandler
{
    public class CafeQueryHandler : IRequestHandler<CafeQuery, CafeResponseDto?>
    {
        private readonly ICafeRepository _repository;

        public CafeQueryHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task<CafeResponseDto?> Handle(CafeQuery query, CancellationToken cancellationToken)
        {
            var cafe = await _repository.Get(query.Id);
            CafeResponseDto? result = null;

            if (cafe is not null)
            {
                result = new CafeResponseDto()
                {
                    Id = cafe.Id,
                    Name = cafe.Name,
                    Description = cafe.Description,
                    Logo = cafe.Logo,
                    Location = cafe.Location,
                    EmployeeCount = cafe.Employees.Count,
                };
            }

            return result;
        }
    }
}
