using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace COOK.CMS.Shared.ViewModels
{

    public class PagingForm
    {
        public int draw { get; set; }

        public int start { get; set; }
        public int length { get; set; }


        public PagingSearch  /*Dictionary<string, string>*/ search { get; set; }
        public List<PagingOrder/*Dictionary<string, string>*/> order { get; set; }
        public List<PagingColumn/*Dictionary<string, string>*/> columns { get; set; }

        private Dictionary<string, string> orderColumns = new Dictionary<string, string>();

        public Dictionary<string, string> OrderColumns
        {
            get
            {
                foreach (var o in order)
                {
                    if (!orderColumns.ContainsKey(columns[o.column].name))
                    {
                        orderColumns.Add(columns[o.column].name, o.dir.ToString());
                    }
                }
                return orderColumns;
            }
        }
    }


    public enum OrderDirection
    {
        asc, desc
    }

    public class PagingOrder
    {
        public int column { get; set; }
        public OrderDirection dir { get; set; }
    }
    public class PagingSearch
    {
        public string value { get; set; } = "";
        public string regex { get; set; } = "";
    }

    public class PagingColumn
    {
        public string data { get; set; }
        public string name { get; set; }
        public Boolean searchable { get; set; }
        public Boolean orderable { get; set; }
        public PagingSearch search { get; set; }
    }
}
