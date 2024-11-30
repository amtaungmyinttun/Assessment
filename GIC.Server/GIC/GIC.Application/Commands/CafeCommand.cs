using GIC.Application.DTOs.Request;
using MediatR;

namespace GIC.Application.Commands
{
    public record CreateCafeCommand(CreateCafeRequestDto request) : IRequest;
    public record UpdateCafeCommand(UpdateCafeRequestDto request) : IRequest;
    public record DeleteCafeCommand(int Id) : IRequest;
}
