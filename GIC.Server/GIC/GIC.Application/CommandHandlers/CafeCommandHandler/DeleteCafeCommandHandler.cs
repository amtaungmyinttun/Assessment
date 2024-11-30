using GIC.Application.Commands;
using GIC.Application.Interfaces;
using MediatR;

namespace GIC.Application.CommandHandlers.CafeCommandHandler
{
    public class DeleteCafeCommandHandler : IRequestHandler<DeleteCafeCommand>
    {
        private readonly ICafeRepository _repository;

        public DeleteCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(DeleteCafeCommand command, CancellationToken cancellationToken)
        {
            var cafe = await _repository.Get(command.Id);

            if (cafe is null)
            {
                throw new Exception("Cafe not found");
            }

            await _repository.DeleteAsync(cafe);
        }
    }
}
