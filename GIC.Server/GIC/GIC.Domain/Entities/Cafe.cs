using System.ComponentModel.DataAnnotations;

namespace GIC.Domain.Entities
{
    public class Cafe
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        public string? Logo { get; set; }

        [Required]
        public string Location { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
