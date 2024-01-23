import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/categories';
import { Spinner } from 'components';
import { catService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [cate, setCategory] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch cat and set default form values if in edit mode
        catService.getById(id)
            .then(x => setCategory(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h3>Sửa danh mục</h3>
            {cate ? <AddEdit cate={cate} /> : <Spinner />}
        </Layout>
    );
}