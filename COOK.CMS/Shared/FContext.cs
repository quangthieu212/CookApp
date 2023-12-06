
using COOK.CMS.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace COOK.CMS.Shared
{
    public class FContext: DbContext
    {
        public FContext(DbContextOptions<FContext> options) :base(options) { }
        public DbSet<User> User { get; set; }
        public DbSet<UserGroup> User_Group { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<UserRole> User_Role { get; set; }
        public DbSet<UserAllergyFavorite> User_Allergy_Favorite { get; set; }
        public DbSet<UserHealth> User_Health { get; set; }
        public DbSet<UserPayment> User_Payment { get; set; }
        public DbSet<BuyPlan> Buy_Plan { get; set; }
        public DbSet<BuyDetail> Buy_Detail { get; set; }
        public DbSet<EatPlan> Eat_Plan { get; set; }
        public DbSet<EatDetail> Eat_Detail { get; set; }
        public DbSet<NutritionCategory> Nutrition_Category { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<MenuNear> Menu_Near { get; set; }
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<RecipeDetail> Recipe_Detail { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<RateComment> Rate_Comment { get; set; }
        public DbSet<Voucher> Voucher { get; set; }
    }
}
