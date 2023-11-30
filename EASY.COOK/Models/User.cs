using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EASY.COOK.Shared.Models
{
    public class User : BaseModel
    {
        public long? grp_id { get; set; }
        public string user_id{ get; set; }
        public string user_pass { get; set; }
        public string? user_name { get; set; }
        public DateTime? user_birth { get; set; }
        public string? user_gender { get; set; }
        public string? user_address { get; set; }
        public string? user_phone { get; set; }
        public string? user_email { get; set; }
        public string? user_image { get; set; }
        public bool? user_status { get; set; }
        [NotMapped]
        public List<Role> roles { get; set; }

    }
}