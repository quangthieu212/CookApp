namespace EASY.COOK.Models
{
    public class UserGroup : BaseModel
    {
        public string grp_name { get; set; }
        public short? grp_type { get; set; } = (short)type.User;
        public short? grp_level { get; set; } = (short?)level.Normal;
        public string? grp_description { get; set; }
        public bool? grp_status { get; set; }
    }
    enum level: short
    {
        Normal = 0,
        Vip = 1,
        Special = 2
    }
    enum type : short
    {
        User = 0,
        Admin = 1
    }
}