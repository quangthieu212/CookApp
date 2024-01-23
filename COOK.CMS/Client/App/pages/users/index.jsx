import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner} from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { Search } from 'components/search'
import { Dropdown } from "@nextui-org/react";
import {page_const} from 'constants'

export default Index;

function Index() {

    const options = [
        {
          label: page_const.page_option.item_per_page_10,
          value: page_const.page_option.item_per_page_10,
        },
        {
            label: page_const.page_option.item_per_page_20,
            value: page_const.page_option.item_per_page_20,
        },
        {
            label: page_const.page_option.item_per_page_50,
            value: page_const.page_option.item_per_page_50,
        },
        {
            label: page_const.page_option.item_per_page_100,
            value: page_const.page_option.item_per_page_100,
        },
      ];

    const [valueSelect, setValueSelect] = useState(page_const.page_option.item_per_page_10);

    let item = {
        key:'',
        value:''
    }
    let requestFilter = {
        pageNumber: page_const.page_number,
        pageSize:page_const.page_size,
        filters:[item],
        sortColumns:['']
    }
    const [users, setUsers] = useState(null);
    useEffect(() => {
        userService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setUsers(x));
    },[])

    function deleteUser(id) {
        userService.delete(id).then(() => {
            userService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setUsers(x));
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    function filterUser(filter){
        item = {
            key: filter,
            value: filter
        }
        requestFilter.filters = [item];
        userService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setUsers(x));
    }

    function handlePage(page){
        setValueSelect(page);
        requestFilter.pageSize = page;
        userService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setUsers(x));
    }

    const user_login  =  JSON.parse(localStorage.getItem(page_const.common.save_localstorage));
    
    return (
        <Layout>
            <h3>{page_const.user_page.list_title}</h3>
            <div className='row'>
                <div className='col-6'>
                    <input className="form-control form-control-sm col-4 float-left mr-1" type="text" name="filter" placeholder={page_const.common.search_placeholder} onChange={e => filterUser(e.target.value)} />
                    <select className="col-2 form-select form-select-sm show-menu-arrow"
                    value={valueSelect}
                    onChange={(e) => {
                        handlePage(e.target.value);
                      }}
                    >
                        {options.map((opt,index) => 
                           <option key={index} value={opt.value}>{opt.label}</option>
                        )}
                    </select>
                </div>
                <div className='col-6'>
                    <Link href="/users/add" className="btn btn-sm btn-success mb-2" style={{ float: 'right' }}> <i class="fa fa-plus-circle"></i> {page_const.common.add_new}</Link>
                </div>
            </div>
            <table className="table table-hover table-bordered">
                <thead className="table-info text-center">
                    <tr>
                        <th style={{ width: '9%' }}>{page_const.user_page.list_header.acc}</th>
                        <th style={{ width: '7%' }}>{page_const.user_page.list_header.type}</th>
                        <th style={{ width: '15%' }}>{page_const.user_page.list_header.name}</th>
                        <th style={{ width: '9%' }}>{page_const.user_page.list_header.birth}</th>
                        <th style={{ width: '7%' }}>{page_const.user_page.list_header.gender}</th>
                        <th style={{ width: '8%' }}>{page_const.user_page.list_header.phone}</th>
                        <th style={{ width: '25%' }}>{page_const.user_page.list_header.addr}</th>
                        <th style={{ width: '10%' }}>{page_const.user_page.list_header.email}</th>
                        <th style={{ width: '10%' }}>{page_const.user_page.list_header.action}</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.user_name}</td>
                            <td>{user.user_type === '0' ? page_const.user_page.user_type.manager : (user.user_type === '1' ? page_const.user_page.user_type.employee : page_const.user_page.user_type.customer)}</td>
                            <td>{user.full_name}</td>
                            <td>{new Date(user.birth).toLocaleDateString('en-GB')} </td>
                            <td>{user.gender === '1' ? page_const.user_page.user_gender.M : (user.gender === '0' ? page_const.user_page.user_gender.F : page_const.user_page.user_gender.O)}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.email}</td>
                            {user_login && user_login.user_type === "0" &&
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1"><i class="fa fa-edit"></i> {page_const.common.edit}</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span><i class="fa fa-remove"></i> {page_const.common.del}</span>
                                    }
                                </button>
                            </td>
                            }
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">{page_const.message.not_found}</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}
