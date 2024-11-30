using GIC.Application.Commands;
using GIC.Application.Interfaces;
using MediatR;

namespace GIC.Application.CommandHandlers.EmployeeCommandHandler
{
    public class DeleteCafeCommandHandler : IRequestHandler<DeleteEmployeeCommand>
    {
        private readonly IEmployeeRepository _repository;

        public DeleteCafeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(DeleteEmployeeCommand command, CancellationToken cancellationToken)
        {
            var employee = await _repository.Get(command.Id);

            if (employee is null)
            {
                throw new Exception("Employee not found");
            }

            await _repository.DeleteAsync(employee);
        }
    }
}
