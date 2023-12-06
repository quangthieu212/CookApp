namespace COOK.CMS.Shared.Dtos.Requests
{
    public class LoginRequest
    {
        public string user_id { get; set; }
        public string user_pass { get; set; }
        public bool IsRemember { get; set; }
    }
}
