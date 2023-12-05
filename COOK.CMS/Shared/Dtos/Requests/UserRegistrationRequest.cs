using System;
using System.ComponentModel.DataAnnotations;

namespace COOK.CMS.Shared.Dtos.Requests
{
    public class UserRegistrationRequest
    {
        [Required]
        public string user_id { get; set; }
        [Required]
        public string user_name { get; set; }
        [Phone]
        public string user_phone { get; set; }
        [EmailAddress]
        public string user_email { get; set; }
        [Required]
        public string user_pass { get; set; }
    }
}
