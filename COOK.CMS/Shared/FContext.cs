
using COOK.CMS.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace COOK.CMS.Shared
{
    public class FContext: DbContext
    {
        public FContext(DbContextOptions<FContext> options) :base(options) { }
        public DbSet<User> user { get; set; }
    }
}
