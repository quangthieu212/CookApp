namespace COOK.CMS.Shared.Models
{
    public class UserAllergyFavorite : BaseModel
    {
        public string? user_id { get; set; }
        public long? menu_id { get; set; }
        public long? ingredient_id { get; set; }
        public string? priority { get; set; }
        public bool? af_type { get; set; }
    }
}
