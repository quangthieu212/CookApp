import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from 'services';

export { Layout };

function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="container">
            <div className="col-md-8 offset-md-2 mt-5">
                        {children}
            </div>
        </div>
    );
}