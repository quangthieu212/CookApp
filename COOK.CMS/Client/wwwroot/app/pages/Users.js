export function ValidateForm() {
    let validateData = {
        rules: {
            user_id: {
                required: true,
                remote: {
                    url: "/api/CheckExists",
                    type: "post",
                    data: {
                        user_id: function () {
                            return $("input[name=user_id]").val();
                        }
                    }
                }
            },
            user_pass: {
                required: true,
            },
        },
        messages: {
            user_id: {
                required: "Không được để trống",
                remote: "Tài khoản đã tồn tại"
            },
            user_pass: {
                required: "Không được để trống",
            },
        }
    };
    validateForm(".form", validateData);
}
export function IsValidate() {
    let validateData = {
        rules: {
            user_id: {
                required: true,
            },
            user_pass: {
                required: true,
            },
        },
        messages: {
            user_id: {
                required: "Không được để trống",
            },
            user_pass: {
                required: "Không được để trống",
            },
        }
    };
    validateForm(".form", validateData);
}