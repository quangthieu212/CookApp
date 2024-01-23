export const page_const = {
    page_size: 10,
    page_number: 0,
    page_option: {
        item_per_page_10: '10',
        item_per_page_20: '20',
        item_per_page_50: '50',
        item_per_page_100: '100'
    },
    filter : {
        type_all: 'All',
        sort_type: 'asc',
        sort_field: 'id'
    },
    message:{
        not_found:'Không có dữ liệu',
        user: {
            edit_success:'Cập nhật User thành công',
            add_success:'Thêm mới User thành công'
        }
    },
    date:{
        dMy_format:'dd/MM/yyyy',
        yMd_format:'yyyy/MM/dd'
    },
    common:{
        save_localstorage: 'user',
        search_placeholder: 'Tìm trong danh sách...',
        add_new:'Thêm mới',
        edit:'Sửa',
        del:'Xóa',
        save:'Lưu',
        cancel:'Hủy',
        refresh:'Nhập lại',
        image:'Ảnh đại diện',
        pwd:'Mật khẩu',
        re_pwd:'Nhập lại mật khẩu'
    },
    user_page:{
        list_title: 'Danh sách người dùng',
        list_header: {
            acc: 'Tài khoản',
            type: 'Nhóm',
            name: 'Họ tên',
            birth: 'Ngày sinh',
            gender: 'Giới tính',
            phone: 'Điện thoại',
            addr: 'Địa chỉ',
            email: 'Email',
            action: 'Sửa/Xóa'
        },
        user_type :{
            title:'Nhóm',
            manager:'Quản lý',
            employee:'Nhân viên',
            customer:'Khách hàng'
        },
        user_gender :{
            title:'Giới tính',
            F:'Nữ',
            M:'Nam',
            O:'Khác'
        },
        farm_info :{
            title: 'Thông tin trang trại',
            name: 'Tên trang trại',
            phone: 'Điện thoại',
            addr: 'Địa chỉ'
        }
    },
    cate_page:{
        list_title: 'Danh mục',
        list_header: {
            type: 'Nhóm',
            name: 'Tên danh mục',
            creator: 'Người tạo',
            descript: 'Mô tả',
            state: 'Trạng thái',
            action: 'Sửa/Xóa'
        },
        cat_type :{
            title:'Nhóm',
            post:'Bài viết',
            product:'Sản phẩm'
        },
        cat_state :{
            title:'Trạng thái',
            active:'Hoạt động',
            inactive:'Không hoạt động'
        },
    }
};
