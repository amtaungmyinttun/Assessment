using GIC.Application.Commands;
using GIC.Application.Interfaces;
using GIC.Domain.Entities;
using MediatR;

namespace GIC.Application.CommandHandlers.EmployeeCommandHandler
{
    public class CreateCafeCommandHandler : IRequestHandler<CreateEmployeeCommand>
    {
        private readonly IEmployeeRepository _repository;

        public CreateCafeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var employee = new Employee()
            {
                Name = command.request.Name,
                EmailAddress = command.request.EmailAddress,
                PhoneNumber = command.request.PhoneNumber,
                Gender = command.request.Gender,
                StartDate = command.request.StartDate,
                CafeId = command.request.CafeId,
            };
            await _repository.AddAsync(employee);
        }
    }
}
