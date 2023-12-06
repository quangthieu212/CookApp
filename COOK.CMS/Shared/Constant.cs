namespace COOK.CMS.Shared
{
    public class Constant
    {
        //status code
        public const string SuccessCode = "200";
        public const string ConflictCode = "409";
        public const string BadRequestCode = "400";
        public const string NotFoundCode = "404";
        //message
        public const string Confict_Message = "Bạn đã đăng ký. Vui lòng đăng nhập\n user_name:";
        public const string Login_Fail_Message = "Sai user_name hoặc password. Vui lòng đăng nhập lại";
        public const string NotFound_Message = "Không tìm thấy dữ liệu ";
        public const string Login_Success_Message = "Đăng nhập thành công.";
        public const string Register_Success_Message = "Đăng ký thành công.";
        public const string Add_Success_Message = "Thêm mới thành công.";
        public const string Edit_Success_Message = "Cập nhật thành công.";
        //route api
        public const string Root_Api = "api/";
        //User
        public const string Register_Api = "register";
        public const string Login_Api = "login";
        public const string Update_Api = "updateUser/{id}";
        public const string Del_Api = "deleteUser/{id}";
        public const string List_Api = "Users";
        public const string GetById_Api = "getUserById/{id}";
        public const string GetByName_Api = "getUserByName/{name}";
        //Category
        public const string Add_Category_Api = "addCategory";
        public const string Update_Category_Api = "updateCategory/{id}";
        public const string Del_Category_Api = "deleteCate/{id}";
        public const string List_Category_Api = "Categories";
        public const string GetCatById_Api = "getCatById/{id}";
        //Role
        public const string Add_Role_Api = "addRole";
        public const string Update_Role_Api = "updateRole/{id}";
        public const string Del_Role_Api = "deleteRole/{id}";
        public const string List_Role_Api = "Roles";
        public const string GetRoleById_Api = "getRoleById/{id}";

        //File
        public const string File_Api = "uploadFile";
        public const string Multi_File_Api = "uploadMultiFile";
        //search
        public const string TYPE_ALL_FILTER = "All";
        public const string ODER_ASC = "asc";

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


        public const string MESSAGE_ADD = "Thêm thành công";
        public const string MESSAGE_UPDATE = "Cập nhật thành công";
        public const string MESSAGE_FAIL = "Thực hiện thất bại";
    }
}
