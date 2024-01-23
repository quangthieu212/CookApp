import Link from 'next/link';

import { userService } from 'services';
import { Search } from 'components/search'

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
            <Search/>
                <h1>Hi {userService.userValue?.full_name}!</h1>
                <p>Conguration login success</p>
                <p><Link href="/users">Manage Users</Link></p>
                <p><Link href="/categories">Manage Category</Link></p>
            </div>
        </div>
    );
}
