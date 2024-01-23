import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const catService = {
    getAll,
    getById,
    add,
    update,
    delete: _delete
};

async function getAll(type,requestFilter,softField,softType) {
    return await fetchWrapper.post(`${baseUrl}/Categories?type=${type}&softField=${softField}&softType=${softType}`,requestFilter);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/getCatById/${id}`);
}

async function add(cate) {
    await fetchWrapper.postMulti(`${baseUrl}/addCategory/`, cate);
}

async function update(id, params) {
    await fetchWrapper.putMulti(`${baseUrl}/updateCategory/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/deleteCate/${id}`);
 
}
