import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Spinner} from 'components';
import { Layout } from 'components/categories';
import { userService, catService } from 'services';
import {page_const} from 'constants'

export default Index;
function Index() {
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

    const [categories, setCategory] = useState(null);
    const [users, setUsers] = useState(null);
    useEffect(() => {
        catService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setCategory(x));
        userService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setUsers(x));
    },[])

    function deleteCat(id) {
        catService.delete(id).then(() => {
            catService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setCategory(x));
            setCategory(categories => categories.filter(x => x.id !== id));
        });
    }
    function filterCat(filter){
        item = {
            key: filter,
            value: filter
        }
        requestFilter.filters = [item];
        catService.getAll(page_const.filter.type_all, requestFilter, page_const.filter.sort_field, page_const.filter.sort_type).then(x => setCategory(x));
    }
    const user_login  =  JSON.parse(localStorage.getItem(page_const.common.save_localstorage));
    return (
        <Layout>
            {/* {users &&
            <div>
                <p>abc</p>
            </div>
            } */}
            <h3>{page_const.cate_page.list_title}</h3>
            <input className="form-control form-control-sm col-2 float-left" type="text" name="filter" placeholder={page_const.common.search_placeholder} onChange={e => filterCat(e.target.value)} />
            <Link href="/categories/add" className="btn btn-sm btn-success mb-2" style={{ float: 'right' }}> <i class="fa fa-plus-circle"></i> {page_const.common.add_new}</Link>
            <table className="table table-hover table-bordered">
                <thead className="table-info text-center">
                    <tr>
                        <th style={{ width: '18%' }}>{page_const.cate_page.list_header.name}</th>
                        <th style={{ width: '10%' }}>{page_const.cate_page.list_header.type}</th>
                        <th style={{ width: '12%' }}>{page_const.cate_page.list_header.creator}</th>
                        <th style={{ width: '36%' }}>{page_const.cate_page.list_header.descript}</th>
                        <th style={{ width: '12%' }}>{page_const.cate_page.list_header.state}</th>
                        <th style={{ width: '12%' }}>{page_const.cate_page.list_header.action}</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories?.map(cat =>
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td>{cat.type === '0' ? page_const.cate_page.cat_type.post : page_const.cate_page.cat_type.product}</td>
                                <td>
                                    {
                                        users?.filter(user => user.id === cat.owner_id)[0].full_name
                                    }
                                </td>
                                <td>{cat.description}</td>
                                <td>{cat.status === true ? page_const.cate_page.cat_state.active  : page_const.cate_page.cat_state.inactive}</td>
                                {user_login && user_login.user_type === "0" &&
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link href={`/categories/edit/${cat.id}`} className="btn btn-sm btn-primary me-1"><i class="fa fa-edit"></i>{page_const.common.edit}</Link>
                                    <button onClick={() => deleteCat(cat.id)} className="btn btn-sm btn-danger btn-delete-cat" style={{ width: '60px' }} disabled={cat.isDeleting}>
                                        {cat.isDeleting
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span><i class="fa fa-remove"></i>{page_const.common.del}</span>
                                        }
                                    </button>
                                </td>
                                }
                            </tr>
                        )}
                        {/* {!categories &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                        } */}
                        {categories && !categories?.length &&
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