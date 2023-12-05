using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.Dtos.Requests
{
    public class ChangePasswordRequest
    {
        [Required]
        public string user_id { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PasswordOld { get; set; }
    }
}
