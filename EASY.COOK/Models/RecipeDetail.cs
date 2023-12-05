namespace EASY.COOK.Models
{
    public class RecipeDetail
    {
        public long id { get; set; }
        public long? rec_id { get; set; }
        public long? ingredient_id { get; set; }
        public decimal? quantity { get; set; }
        public int? sequence { get; set; }
        public string? note { get; set; }
    }
}
