namespace EASY.COOK.Models
{
    public class NutritionCategory : BaseModel
    {
        public string? nut_name { get; set; }
        public string? nut_unit { get; set; }
        public decimal? nut_carbohydrate { get; set; }
        public decimal? nut_fat { get; set; }
        public decimal? nut_protein { get; set; }
        public decimal? nut_vitamin { get; set; }
        public decimal? nut_minerals { get; set; }
        public decimal? nut_calo { get; set; }
    }
}
