using COOK.CMS.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.ViewModels
{
    public class CategoryForm : BaseForm
    {
        public string CategoryName { get; set; }
        public CategoryForm Parent { get; set; }
        public string Status { get; set; }
        public List<int> Label { get; set; }
        public string prefix { get; set; }

        public string Behind { get; set; }

        public List<CategoryForm> Child { get; set;}

        public CategoryForm()
        {

        }

        public CategoryForm(long id)
        {
            this.id = id;
        }

        public CategoryForm(Category docEntity)
        {
            this.CategoryName = docEntity.CategoryName;
            this.Behind = docEntity.Behind;
            this.Child = new List<CategoryForm>();
            this.Label = new List<int>();
            this.Status = docEntity.Status;
        }
    }
}
