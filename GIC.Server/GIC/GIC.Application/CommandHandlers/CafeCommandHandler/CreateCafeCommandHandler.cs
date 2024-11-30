using GIC.Application.Commands;
using GIC.Application.Interfaces;
using GIC.Domain.Entities;
using MediatR;

namespace GIC.Application.CommandHandlers.CafeCommandHandler
{
    public class CreateCafeCommandHandler : IRequestHandler<CreateCafeCommand>
    {
        private readonly ICafeRepository _repository;

        public CreateCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateCafeCommand command, CancellationToken cancellationToken)
        {
            var cafe = new Cafe()
            {
                Name = command.request.Name,
                Description = command.request.Description,
                Location = command.request.Location,
                Logo = command.request.Logo,
            };

            if (command.request.Upload is not null && command.request.Upload.Length != 0)
            {
                using (var ms = new MemoryStream())
                {
                    command.request.Upload.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    cafe.Logo = "data:image/png;base64," + Convert.ToBase64String(fileBytes);
                }
            }

            await _repository.AddAsync(cafe);
        }
    }
}
