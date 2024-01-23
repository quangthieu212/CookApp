import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState, useMemo, useEffect} from 'react';
import { Checkbox, Radio, Dropdown } from "@nextui-org/react";

import { catService, alertService } from 'services';
import {page_const} from 'constants'

export { AddEdit };

function AddEdit(props) {
    const cate = props?.cate;
    const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        // user_name: Yup.string()
        //     .required('Phải điền tên đăng nhập')
        //     .max(60, 'Tên đăng nhập tối đa 60 ký tự'),
        // user_pass: Yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     // password optional in edit mode
        //     .concat(user ? null : Yup.string().required('Phải nhập mật khẩu'))
        //     .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        // user_pass_repeat: Yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     // repeat password optional in edit mode
        //     .concat(user ? null : Yup.string().required('Phải nhập lại mật khẩu'))
        //     .min(6, 'Mật khẩu tối thiểu 6 ký tự')
        //     .oneOf([Yup.ref('user_pass'), null], 'Mật khẩu nhập lại chưa đúng'),
        // email: Yup.string().email('Email chưa đúng định dạng')
        //     .transform(x => x === '' ? undefined : x)
        //     .max(100, 'Tên đăng nhập tối đa 100 ký tự'),
        // phone:Yup.string()
        //     .transform(x => x === '' ? undefined : x)
        //     .min(10,'Số điện thoại tối thiểu 10 ký tự')
        //     .max(12,'Số điện thoại tối đa 12 ký tự')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (cate) {
        formOptions.defaultValues = props.cate;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const menuItems = [
        { key: "0", name: page_const.cate_page.cat_type.post },
        { key: "1", name: page_const.cate_page.cat_type.product }
      ];

    const [selected, setSelected] = useState(cate ? new Set([cate.type]) : new Set(["1"]));

    var selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
      );   

    
    const [file, setFile] = useState(null);

    const [active, setStatus] = useState(cate ? cate.status : true);
    const user_login  =  JSON.parse(localStorage.getItem(page_const.common.save_localstorage));
    async function onSubmit(data) {
        data.owner_id = user_login.id;
        //console.log(data);
        const formData = new FormData();
        if(file != null && file !=undefined){
            formData.append("files", file, file?.name);
        }
        formData.append("json",JSON.stringify(data));
        // console.log(formData.get("files"));
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (cate) {
                await catService.update(cate.id, formData);
                message = 'Cập nhật danh mục thành công';
            } else {
                await catService.add(formData);
                message = 'Thêm mới danh mục thành công';
            }

            //redirect to user list with success message
            router.push('/categories');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
           
        }
    }
 
    const handleStatusChange = (e) => { 
        if(e === undefined) {return}
        setStatus(!e.target.checked); 
        //console.log(active);
      };  

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col-8">
                    <label className="form-label">{page_const.cate_page.list_header.name}</label>
                    <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="mb-3 col-3">
                    <label className="form-label">{page_const.cate_page.list_header.type}</label>
                    <Dropdown>
                        <Dropdown.Button flat className='w-250' name='type' {...register('type')} value={selectedValue}>
                            {menuItems.at(parseInt(selectedValue)).name}
                        </Dropdown.Button>
                        <Dropdown.Menu 
                        aria-label="Chọn kiểu" 
                        items={menuItems} 
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={e => setSelected(e)}
                        >
                            {(item) => (
                            <Dropdown.Item
                                key={item.key}
                                value={item.name}
                            >
                                {item.name}
                            </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="mb-3 col-1">
                <label className="form-label mr-2">{page_const.cate_page.list_header.state}&ensp;</label>
                <input type="checkbox"
                        name='status' {...register('status')} 
                        checked={!active} 
                        onChange={(e) => handleStatusChange(e)} 
                        />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">{page_const.cate_page.list_header.descript}</label>
                    <textarea name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">{page_const.common.image}Ảnh đại diện </label>
                    <input 
                    className={`form-control`} 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])}
                    accept=".png,.jpeg" />
                </div> 
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    <i class="fa fa-save"></i>{page_const.common.save}
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary"><i class="fa fa-refresh"></i>{page_const.common.refresh}</button>
                <Link href="/categories" className="btn btn-link"><i class="fa fa-ban"></i>{page_const.common.cancel}</Link>
            </div>
        </form>
    );
}