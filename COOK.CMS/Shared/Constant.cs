namespace COOK.CMS.Shared
{
    public class Constant
    {

        public const int ITEM_PER_PAGE = 25;
        public class DEPOSIT_STATE
        {
            public const string NEW = "Đăng ký mới";
            public const string WAIT = "Chờ xử lý";
            public const string COMPLETE = "Hoàn thành";
        }
        public class DEPOSIT_TRANS_TYPE
        {
            public const string NAP = "Nạp tiền";
            public const string RUT = "Rút tiền";
        }
        public class Category_Status
        {
            public const string ACTIVE = "Hoạt động";
            public const string DEACTIVE = "Không hoạt động";
        }

        public const string DELETE_CONFIRM = "Bạn có chắc chắn muốn xóa!";
        public const string DELETE_COMPLETE = "Xóa thành công!";
        public const string TYPE_AGENT_PARAM = "new";
        public const string TYPE_AGENT_FILTER = "All";

        public const string ODER_ASC = "asc";
        public const string MESSAGE_ADD = "Thêm thành công";
        public const string MESSAGE_UPDATE = "Cập nhật thành công";
        public const string MESSAGE_FAIL = "Thực hiện thất bại";
    }
}
