using GIC.Application.DTOs.Response;
using MediatR;

namespace GIC.Application.Queries
{
    public record EmployeeListQuery(int? cafeId) : IRequest<IList<EmployeeResponseDto>>;
    public record EmployeeQuery(int Id): IRequest<EmployeeResponseDto?>;
}
