using System;
using System.Text.Json.Serialization;


namespace EASY.COOK.Shared.Dtos
{
    public class AuthResponse
    {
        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [JsonPropertyName("displayName")]
        public string DisplayName { get; set; }

        [JsonPropertyName("role")]
        public string Role { get; set; }


        [JsonPropertyName("accessToken")]
        public string AccessToken { get; set; }

        [JsonPropertyName("refreshToken")]
        public string RefreshToken { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }
    }
}
