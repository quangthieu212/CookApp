import { useState, useEffect } from 'react';
import { NavLink} from '.';
import { userService } from 'services';
import Image from 'next/image'

import logo from '../resource/image/logo_new.png'

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    // if (!user) return null;

    return (
        <div>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-9 col-xs-8">
                            <div className="header-contact">
                                <div className="dib link-contact">
                                    <p><a href="callto:(+84)1234-5678"><i className="fa fa-phone"></i><span>(+84)1234-5678</span></a></p>
                                    <p><a href="mailto:info@ifarm.com"><i className="fa fa-envelope"></i><span>info@ifarm.com</span></a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-3 col-xs-4">
                            <div className="top-link">
                                {
                                    user && <ul className="hidden-sm hidden-xs display-inline">
                                        <li className="customlinks"><a href={`/users/edit/${user.id}`} >My Account</a></li>
                                        <li className="customlinks"><a className="update-wishlist" href="#">Wishlist <span>(0)</span></a></li> 
                                        <li className="customlinks"><a title="compare" target="_blank" href="#">Compare</a> </li>
                                        <button onClick={userService.logout} className="btn btn-link customlinks">Logout</button>
                                    </ul>
                                }
                                {
                                    !user && <ul className="hidden-sm hidden-xs display-inline">
                                        <li className="customlinks"><a href="/account/register">Login / Register</a></li>
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="header-bottom">
                <div className="container">
                    <div className="col-md-12 col-sm-12 col-xs-12 float-none">
                        <h1 className="header-logo">
                            <a href="/" rel="home">
                            <Image
                                src={logo}
                                alt='I-Farm'
                                quality={100}
                            />
                            </a>
                        </h1>
                    </div>
                </div>
            </div> */}
            
            <div className="container">
                <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        {/* <a className="navbar-brand" href="/">I-Farm</a> */}
                        <h1 className="header-logo">
                            <a href="/" rel="home">
                            <Image
                                src={logo}
                                alt='I-Farm'
                                quality={100}
                            />
                            </a>
                        </h1>
                        <div className="social-media order-lg-last">
                            <p className="mb-0 d-flex">
                                <a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-facebook"><i className="sr-only">Facebook</i></span></a>
                                <a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-twitter"><i className="sr-only">Twitter</i></span></a>
                                <a href="#" className="d-flex align-items-center justify-content-center"><span className="fa fa-instagram"><i className="sr-only">Instagram</i></span></a>
                            </p>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fa fa-bars"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto mr-md-3 mega-menu">
                            <li className="nav-item"><a href="/" className="nav-link">Trang chủ</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Về chúng tôi</a></li>      
                            <li className="nav-item menu-item-has-children">
                                <div className="dropdown">
                                    <a href="/categories" className="nav-link dropbtn">Danh mục <span className="icon-next"><i className="fa fa-angle-down"></i></span></a>
                                    <div className="dropdown-content">
                                        <a href="#">Sản phẩm</a>
                                        <a href="#">Dịch vụ</a>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item"><a href="#" className="nav-link">Tin tức</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Liên hệ</a></li>
                        
                        </ul>
                    </div>
                    </div>
                </nav>
                
            </div>
        </div>
    );
}