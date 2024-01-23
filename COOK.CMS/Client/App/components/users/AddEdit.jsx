import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState, useMemo, useEffect} from 'react';
import { Radio, Dropdown, Collapse } from "@nextui-org/react";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { userService, alertService } from 'services';
import {page_const} from 'constants'

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        user_name: Yup.string()
            .required('Phải điền tên đăng nhập')
            .max(60, 'Tên đăng nhập tối đa 60 ký tự'),
        user_pass: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(user ? null : Yup.string().required('Phải nhập mật khẩu'))
            .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        user_pass_repeat: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // repeat password optional in edit mode
            .concat(user ? null : Yup.string().required('Phải nhập lại mật khẩu'))
            .min(6, 'Mật khẩu tối thiểu 6 ký tự')
            .oneOf([Yup.ref('user_pass'), null], 'Mật khẩu nhập lại chưa đúng'),
        email: Yup.string().email('Email chưa đúng định dạng')
            .transform(x => x === '' ? undefined : x)
            .max(100, 'Tên đăng nhập tối đa 100 ký tự'),
        phone:Yup.string()
            .transform(x => x === '' ? undefined : x)
            .min(10,'Số điện thoại tối thiểu 10 ký tự')
            .max(12,'Số điện thoại tối đa 12 ký tự')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const user_login  =  JSON.parse(localStorage.getItem(page_const.common.save_localstorage));
    // set default form values if in edit mode
    if (user) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [startDate, setStartDate] = useState(user ? new Date(user.birth) : new Date());
    const menuItems = [
        { key: "0", name: page_const.user_page.user_type.manager },
        { key: "1", name: page_const.user_page.user_type.employee },
        { key: "2", name: page_const.user_page.user_type.customer },
      ];

    const [selected, setSelected] = useState(user ? new Set([user.user_type]) : new Set(["2"]));

    var selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
      );   
    
    const [selectGender, setGender] = useState(user ? user.gender : '0');
    
    const selectedValueGen = useMemo(
        () => Array.from(selectGender).join(", ").replaceAll("_", " "),
        [selectGender]
      );
    
    const [file, setFile] = useState(null);

    const [file1, setFile1] = useState(null);

    async function onSubmit(data) {
        // console.log(selectedValue);
        data.parrent_id = user_login?.id;
        //console.log(data);
        // console.log(file);
        // console.log(file1);
        data.gender = selectedValueGen;
        data.birth = startDate.toISOString();
        //validate data
        if(data?.user_type != '0') {
            data.farm_infor = null;
        }
        //console.log(data);
        const formData = new FormData();
        if(file != null && file !=undefined){
            formData.append("files", file, file?.name);
        }
        if(file1 != null && file1 !=undefined){
            formData.append("files1", file1, file1?.name);
        }
        formData.append("json",JSON.stringify(data));
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (user) {
                await userService.update(user.id, formData);
                message = page_const.message.user.edit_success;
            } else {
                await userService.register(formData);
                message = page_const.message.user.add_success;
            }

            //redirect to user list with success message
            router.push('/users');
            alertService.success(message, true);
            alertService.clear();
        } catch (error) {
            alertService.error(error);
            console.error(error);
           
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="parrent_id" type="hidden" {...register('parrent_id')}/>
            <Collapse title= {selectedValue == '0' ? (user ? page_const.common.edit: page_const.common.add_new) + ': '+ page_const.user_page.user_type.manager : selectedValue == '1' ? (user ? page_const.common.edit: page_const.common.add_new) + ': '+ page_const.user_page.user_type.employee : (user ? page_const.common.edit: page_const.common.add_new) + ': '+ page_const.user_page.user_type.customer}  expanded={true} divider={false} >
            <div className="row">
                <div className="mb-3 col-6">
                    <label className="form-label">{page_const.user_page.list_header.name}</label>
                    <input name="full_name" type="text" {...register('full_name')} className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.full_name?.message}</div>
                </div>
                <div className="mb-3 col-3">
                    <label className="form-label">{page_const.user_page.list_header.phone}</label>
                    <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <div className="mb-3 col-3">
                    <label className="form-label">{page_const.user_page.user_type.title}</label>
                    <Dropdown>
                        <Dropdown.Button flat className='w-250' name='user_type' {...register('user_type')} value={selectedValue}>
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
            </div>
            <div className="row">
                <div className="mb-3 col-6">
                    <label className="form-label">{page_const.user_page.list_header.acc}</label>
                    <input name="user_name" type="text" {...register('user_name')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.user_name?.message}</div>
                </div>
                <div className="mb-3 col-3">
                    <label className="form-label">
                        {page_const.user_page.pwd}
                    </label>
                    <input name="user_pass" type="password" {...register('user_pass')} className={`form-control ${errors.user_pass ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.user_pass?.message}</div>
                </div>
                <div className="mb-3 col-3">
                    <label className="form-label">
                    {page_const.user_page.re_pwd}
                    </label>
                    <input name="user_pass_repeat" type="password" {...register('user_pass_repeat')} className={`form-control ${errors.user_pass_repeat ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.user_pass_repeat?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-3 self-center">
                    <label className="form-label mr-4">{page_const.user_page.list_header.birth}</label>
                    <div id ="dateIput">
                        <DatePicker name="birth" {...register('birth')} className={`form-control ${errors.birth ? 'is-invalid' : ''}`}  
                        selected={startDate} 
                        dateFormat = {page_const.date.dMy_format}
                        onChange= {(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className="mb-3 col-3 self-center">
                    <Radio.Group label={page_const.user_page.user_gender.title}
                        orientation="horizontal" name='gender' {...register('gender')} value={selectGender} onChange={e => setGender(e)}>
                            <Radio value="0">{page_const.user_page.user_gender.F}</Radio>
                            <Radio value="1">{page_const.user_page.user_gender.M}</Radio>
                            <Radio value="2">{page_const.user_page.user_gender.O}</Radio>
                    </Radio.Group>
                </div>
                <div className="mb-3 col-6">
                    <label className="form-label">{page_const.user_page.list_header.email}</label>
                    <input name="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">{page_const.user_page.list_header.addr}</label>
                    <input name="address" type="text" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
                
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">{page_const.user_page.image} </label>
                    <input 
                    className={`form-control`} 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])}
                    accept=".png,.jpeg" />
                </div>
            </div>
            </Collapse>
            {selectedValue == '0' &&
            <Collapse title={page_const.user_page.farm_info.title} expanded={true} divider={false} disabled = {selectedValue !== '0'} className='mb-2'>
            <div className="row">
                <div className="mb-3 col-8">
                        <label className="form-label">{page_const.user_page.farm_info.name}</label>
                        <input name="farm_infor.name" type="text" {...register('farm_infor.name')} className={`form-control ${errors.farm_infor?.name ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.farm_infor?.name?.message}</div>
                </div>
                <div className="mb-3 col-4">
                        <label className="form-label">{page_const.user_page.farm_info.phone}</label>
                        <input name="farm_infor.phone" type="text" {...register('farm_infor.phone')} className={`form-control ${errors.farm_infor?.phone ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.farm_infor?.phone?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                        <label className="form-label">{page_const.user_page.farm_info.addr}</label>
                        <input name="farm_infor.address" type="text" {...register('farm_infor.address')} className={`form-control ${errors.farm_infor?.address ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.farm_infor?.address?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">{page_const.user_page.image} </label>
                    <input 
                    className={`form-control`} 
                    type="file" 
                    onChange={e => setFile1(e.target.files[0])}
                    accept=".png,.jpeg" />
                </div> 
            </div>
            </Collapse>
            }
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    <i class="fa fa-save"></i>{page_const.common.save}
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary"><i class="fa fa-refresh"></i> {page_const.common.refresh}</button>
                <Link href="/users" className="btn btn-link"><i class="fa fa-ban"></i>{page_const.common.cancel}</Link>
            </div>
        </form>
    );
}