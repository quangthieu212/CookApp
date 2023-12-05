using System;
using System.ComponentModel.DataAnnotations;

namespace COOK.CMS.Shared.Dtos.Requests
{
    public class UserLoginRequest
    {
        [Required]
        public string user_id { get; set; }

        [Required]
        public string user_pass { get; set; }
    }
}
