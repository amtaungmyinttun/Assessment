using System.ComponentModel.DataAnnotations;

namespace GIC.Domain.Entities
{
    public class Employee
    {
        [Key]
        [Required]
        public int Id { get; set; } // Auto-incremented ID

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [RegularExpression(@"^[89]\d{7}$")]
        public string PhoneNumber { get; set; }

        [Required]
        public string Gender { get; set; }

        public DateTime? StartDate { get; set; }

        public int? CafeId { get; set; }
        public Cafe? Cafe { get; set; }
    }
}
