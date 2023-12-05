namespace EASY.COOK.Models
{
    public class EatPlan : BaseModel
    {
        public string? eat_name { get; set; }
        public int? eat_type { get; set; }
        public string? eat_description { get; set; }
        public DateTime? eat_start_date { get; set; }
        public DateTime? eat_end_date { get; set; }
        public string eat_creater { get; set; }
        public bool? eat_status { get; set; }
        public decimal? total_energy { get; set; }
    }
}
