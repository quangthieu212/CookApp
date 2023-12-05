namespace EASY.COOK.Models
{
    public class Notification : BaseModel
    {
        public string? user_id { get; set; }
        public int? not_type { get; set; }
        public int? not_method { get; set; }
        public string? not_schedule { get; set; }
        public string? not_content { get; set; }
        public bool? not_status { get; set; }
        public string? not_config { get; set; }
    }
}
