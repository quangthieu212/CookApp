﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace COOK.CMS.Shared.Models
{
    public class Role
    {
        public long? id { get; set; }
        public string? rol_name { get; set; }
        public bool? is_menu { get; set; }
        public string? rol_icon { get; set; }
        public string? rol_controller { get; set; }
        public short? rol_order { get; set; }
        public bool? rol_status { get; set; }
        public long? rol_parrent { get; set; }
        [NotMapped]
        public List<Role> Permissions { get; set; } = new List<Role>();
    }
}