namespace EASY.COOK.Models
{
    public class FilterConfiguration : BaseModel
    {
        public string Collection { get; set; }
        public string FieldCode { get; set; }
        public string FieldType { get; set; }
        public string Value { get; set; }

        public List<OptionValue> OptionValues { get; set; }
    }

    public class OptionValue
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
