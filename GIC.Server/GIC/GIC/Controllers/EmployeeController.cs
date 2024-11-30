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
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("GetEmployeeList")]
        public async Task<ActionResult<IEnumerable<EmployeeResponseDto>>> GetEmployeeList(int? cafeId)
        {
            return Ok(await _mediator.Send(new EmployeeListQuery(cafeId)));
        }

        [HttpGet("GetEmployee")]
        public async Task<ActionResult<EmployeeResponseDto?>> GetEmployee(int id)
        {
            return Ok(await _mediator.Send(new EmployeeQuery(id)));
        }

        [HttpPost("CreateEmployee")]
        public async Task<ActionResult> CreateEmployee(CreateEmployeeRequestDto request)
        {
            await _mediator.Send(new CreateEmployeeCommand(request));
            return Ok();
        }

        [HttpPost("UpdateEmployee")]
        public async Task<ActionResult> UpdateEmployee(UpdateEmployeeRequestDto request)
        {
            await _mediator.Send(new UpdateEmployeeCommand(request));
            return Ok();
        }

        [HttpPost("DeleteEmployee")]
        public async Task<ActionResult> DeleteEmployee(int Id)
        {
            await _mediator.Send(new DeleteEmployeeCommand(Id));
            return Ok();
        }
    }
}
