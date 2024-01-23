import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';
import '../styles/css/style.css';
import '../styles/font-awesome-4.7.0/css/font-awesome.min.css'

import '../styles/css/custom.css';

import { userService } from 'services';
import { Nav, Alert, Footer} from 'components';


export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login', '/account/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>I-Farm | Green farm - Bright future</title>
            </Head>
            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav/>
                <Alert />
                {authorized &&
                    <div className='body_bg'
                    data-upb_br_animation="" 
                    data-parallax_sense="30" 
                    data-bg-override="0" 
                    data-bg-animation="left-animation" 
                    data-bg-animation-type="h" 
                    data-animation-repeat="repeat"> 
                        <Component {...pageProps} />
                    </div>   
                }
            </div>
            <div>
                <Footer></Footer>
            </div>
        </>
    );
}
