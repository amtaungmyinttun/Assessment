using GIC.Application.Commands;
using GIC.Application.Interfaces;
using MediatR;

namespace GIC.Application.CommandHandlers.CafeCommandHandler
{
    public class UpdateCafeCommandHandler : IRequestHandler<UpdateCafeCommand>
    {
        private readonly ICafeRepository _repository;

        public UpdateCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(UpdateCafeCommand command, CancellationToken cancellationToken)
        {
            var cafe = await _repository.Get(command.request.Id);

            if (cafe is null)
            {
                throw new Exception("Cafe not found");
            }

            cafe.Name = command.request.Name;
            cafe.Description = command.request.Description;
            cafe.Location = command.request.Location;
            cafe.Logo = command.request.Logo;

            if (command.request.Upload is not null && command.request.Upload.Length != 0)
            {
                using (var ms = new MemoryStream())
                {
                    command.request.Upload.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    cafe.Logo = "data:image/png;base64," + Convert.ToBase64String(fileBytes);
                }
            }

            await _repository.UpdateAsync(cafe);
        }
    }
}
