namespace GIC.Application.DTOs.Request
{
    public class CreateEmployeeRequestDto
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime? StartDate { get; set; }
        public int? CafeId { get; set; }
    }
}
