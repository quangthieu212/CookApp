import { Layout, AddEdit } from 'components/products';

export default Add;

function Add() {
    return (
        <Layout>
            <h3>Thêm mới sản phẩm</h3>
            <AddEdit />
        </Layout>
    );
}