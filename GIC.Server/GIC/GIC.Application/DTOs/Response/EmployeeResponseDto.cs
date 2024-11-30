using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GIC.Application.DTOs.Response
{
    public class EmployeeResponseDto
    {
        public int Id { get; set; }
        public string EmployeeId { get => $"UI{Id:D7}"; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public DateTime? StartDate { get; set; }
        public int? CafeId { get; set; }

        public string CafeName { get; set; }

        public int DayWorked {
            get
            {
                if (StartDate.HasValue)
                {
                    TimeSpan difference = DateTime.Today - StartDate.Value.Date;
                    return (int)difference.TotalDays;
                }
                return 0;
            }
        }
    }
}
