using EASY.COOK.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace EASY.COOK.Shared
{
    public class EasyContext : DbContext
    {
        public EasyContext(DbContextOptions<EasyContext> options) :base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<UserGroup> User_Group { get; set; }
    }
}
