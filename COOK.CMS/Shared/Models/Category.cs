namespace COOK.CMS.Shared.Models
{
    public class Category : BaseModel
    {
        public string CategoryName { get; set; }
        public string Parent { get; set; }
        public string Behind  { get; set; }
        public string Status { get; set; }
    }
}
