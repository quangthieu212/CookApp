namespace COOK.CMS.Shared.Models
{
    public class RateComment : BaseModel
    {
        public long? parrent_id { get; set; }
        public int? rate_value { get; set; }
        public string? rate_title { get; set; }
        public string? com_content { get; set; }
        public string? creater { get; set; }
        public long? menu_id { get; set; }
        public long? rec_id { get; set; }
        public string? rate_state { get; set; }
    }
}
