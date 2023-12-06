namespace COOK.CMS.Shared.Models
{
    public class Menu : BaseModel
    {
        public string? menu_group { get; set; }
        public int? menu_request_type { get; set; }
        public string? menu_localtion_type { get; set; }
        public string? menu_name { get; set; }
        public string? menu_img { get; set; }
        public string? menu_short_desc { get; set; }
        public string? menu_description { get; set; }
        public string ingredient_ids { get; set; }
        public string? menu_refer { get; set; }
        public string? menu_combine { get; set; }
        public long recipe_id { get; set; }
        public decimal? menu_energy { get; set; }
    }
}
