import { Layout, AddEdit } from 'components/categories';

export default Add;

function Add() {
    return (
        <Layout>
            <h3>Thêm mới danh mục</h3>
            <AddEdit />
        </Layout>
    );
}