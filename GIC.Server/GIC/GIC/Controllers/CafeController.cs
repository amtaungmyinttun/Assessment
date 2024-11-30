using GIC.Application.Commands;
using GIC.Application.DTOs.Request;
using GIC.Application.DTOs.Response;
using GIC.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GIC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CafeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CafeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetCafeList")]
        public async Task<ActionResult<IEnumerable<CafeResponseDto>>> GetCafeList(string? location)
        {
            return Ok(await _mediator.Send(new CafeListQuery(location)));
        }

        [HttpGet("GetCafe")]
        public async Task<ActionResult<CafeResponseDto?>> GetCafe(int id)
        {
            return Ok(await _mediator.Send(new CafeQuery(id)));
        }

        [HttpPost("CreateCafe")]
        public async Task<ActionResult> CreateCafe([FromForm]CreateCafeRequestDto request)
        {
            await _mediator.Send(new CreateCafeCommand(request));
            return Ok();
        }

        [HttpPost("UpdateCafe")]
        public async Task<ActionResult> UpdateCafe([FromForm] UpdateCafeRequestDto request)
        {
            await _mediator.Send(new UpdateCafeCommand(request));
            return Ok();
        }

        [HttpPost("DeleteCafe")]
        public async Task<ActionResult> DeleteCafe(int Id)
        {
            await _mediator.Send(new DeleteCafeCommand(Id));
            return Ok();
        }
    }
}
