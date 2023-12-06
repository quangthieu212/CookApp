namespace COOK.CMS.Shared.Models
{
    public class Recipe : BaseModel
    {
        public string? rec_type { get; set; }
        public string? rec_name { get; set; }
        public string? rec_description { get; set; }
        public string? rec_img { get; set; }
        public decimal? rec_energy { get; set; }
        public decimal? rec_time_prepare { get; set; }
        public decimal? rec_time_practice { get; set; }
        public int? rec_num_person { get; set; }
    }
}
