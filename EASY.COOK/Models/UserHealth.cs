namespace EASY.COOK.Models
{
    public class UserHealth : BaseModel
    {
        public string? user_id { get; set; }
        public string? heal_bmi { get; set; }
        public string? heal_beat { get; set; }
        public string? blood_pressure { get; set; }
        public decimal? calo_use { get; set; }
        public string? heal_evalue { get; set; }
        public string? menu_suggestion { get; set; }
    }
}
