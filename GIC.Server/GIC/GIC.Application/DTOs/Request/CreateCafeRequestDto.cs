using Microsoft.AspNetCore.Http;

namespace GIC.Application.DTOs.Request
{
    public class CreateCafeRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
        public IFormFile? Upload { get; set; }
    }
}
