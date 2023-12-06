using COOK.CMS.Shared.Dtos.Requests;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;

namespace COOK.CMS.Shared
{
    public class Utils
    {
        public static long GetCurrentTime()
        {
            DateTime date = DateTime.Now;
            long unixTime = ((DateTimeOffset)date).ToUnixTimeSeconds();
            return unixTime;
        }

        public static string HashPassword(string input)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(input);
            return passwordHash;
        }

        public static bool Verify(string input, string hash)
        {
            bool verified = BCrypt.Net.BCrypt.Verify(input, hash);
            return verified;
        }
        public static object setDirUpload(string jsonString, string dir, string objName)
        {
            object obj = new object();
            switch (objName)
            {
                case nameof(UserRequest):
                    UserRequest userRequest = JsonConvert.DeserializeObject<UserRequest>(jsonString);
                    userRequest.uploadDir = dir;
                    obj = userRequest;
                    break;
            }
            return obj;
        }
    }
}
