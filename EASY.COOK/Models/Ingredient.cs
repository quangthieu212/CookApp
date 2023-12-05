namespace EASY.COOK.Models
{
    public class Ingredient : BaseModel
    {
        public string? ing_type { get; set; }
        public string? ing_name { get; set; }
        public string? ing_unit { get; set; }
        public string? ing_img { get; set; }
        public long? nut_category_id { get; set; }
        public decimal? ing_quantity { get; set; }
        public DateTime? ing_exp_date { get; set; }
        public string? ing_origin { get; set; }
    }
}
