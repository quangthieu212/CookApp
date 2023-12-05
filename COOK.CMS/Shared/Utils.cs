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
    }
}
