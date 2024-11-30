using GIC.Application.DTOs.Request;
using MediatR;

namespace GIC.Application.Commands
{
    public record CreateEmployeeCommand(CreateEmployeeRequestDto request) : IRequest;
    public record UpdateEmployeeCommand(UpdateEmployeeRequestDto request) : IRequest;
    public record DeleteEmployeeCommand(int Id) : IRequest;
}
