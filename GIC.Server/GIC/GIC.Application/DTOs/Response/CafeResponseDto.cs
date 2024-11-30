namespace GIC.Application.DTOs.Response
{
    public class CafeResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
        public int EmployeeCount { get; set; }
    }
}
