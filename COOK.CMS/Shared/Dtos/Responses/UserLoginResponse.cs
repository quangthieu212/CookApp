﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.Dtos.Responses
{
    public class UserLoginResponse
    {
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
