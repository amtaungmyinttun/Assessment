using GIC.Application.DTOs.Response;
using MediatR;

namespace GIC.Application.Queries
{
    public record CafeListQuery(string? location) : IRequest<IList<CafeResponseDto>>;
    public record CafeQuery(int Id): IRequest<CafeResponseDto?>;
}
