using GIC.Application.Commands;
using GIC.Application.Interfaces;
using MediatR;

namespace GIC.Application.CommandHandlers.EmployeeCommandHandler
{
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand>
    {
        private readonly IEmployeeRepository _repository;

        public UpdateEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var employee = await _repository.Get(command.request.Id);

            if (employee is null)
            {
                throw new Exception("Employee not found");
            }

            employee.Name = command.request.Name;
            employee.EmailAddress = command.request.EmailAddress;
            employee.PhoneNumber = command.request.PhoneNumber;
            employee.Gender = command.request.Gender;
            employee.StartDate = command.request.StartDate;
            employee.CafeId = command.request.CafeId;

            await _repository.UpdateAsync(employee);
        }
    }
}
