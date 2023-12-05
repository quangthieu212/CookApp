namespace EASY.COOK.Models
{
    public class Role
    {
        public Role(string name, bool isMenu,string icon, string controller, short order, bool status)
        {
            rol_name = name;
            is_menu = isMenu;
            rol_icon = icon;
            rol_controller = controller;
            rol_order = order;
            rol_status = status;
        }
        public long id { get; set; }
        public string rol_name { get; set; }
        public bool is_menu { get; set; }
        public string rol_icon { get; set; }
        public string rol_controller { get; set; }
        public short rol_order { get; set; }
        public bool rol_status { get; set; }
    }
}