using EASY.COOK.Shared.Dtos.Requests;
using Newtonsoft.Json;

namespace EASY.COOK.Shared
{
    public class Utils
    {
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

        public static object setDirUpload(string jsonString, IConfiguration configuration, string objName)
        {
            var uploadDir = configuration.GetValue<string>("FileStorageStrings:uploadDir");
            object obj = new object();
            switch (objName)
            {
                case nameof(UserRequest):
                    UserRequest userRequest = JsonConvert.DeserializeObject<UserRequest>(jsonString);
                    userRequest.uploadDir = uploadDir;
                    obj = userRequest;
                    break;
            }
            return obj;
        }

    }
}
