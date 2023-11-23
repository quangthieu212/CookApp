namespace EASY.COOK.Shared.Dtos.Requests
{
    public class RequestFilters : PaginationFilter
    {
        public List<Item>? Filters { get; set; }

        public List<string>? SortColumns { get; set; }
    }

    public class Item
    {
        public string? key { get; set; }
        public string? value { get; set; }
    }
}
