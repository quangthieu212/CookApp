import Image from 'next/image'

import logo from '../resource/image/logo_new.png'
export { Footer };

function Footer() {
    return (
        <footer id = "myfarm" className="footer">
        <div className="footer-v1">
            <div className="bg-footer" style={{ height: '409px' }}></div>
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="footer-container row">
                                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                    <div className="footer-home">
                                    <Image
                                        src={logo}
                                        alt='I-Farm'
                                        height={40}
                                        width={240}
                                        quality={100}
                                    />
                                        <aside id="custom_html-2" className="widget_text widget widget_custom_html">
                                            <div className="textwidget custom-html-widget"><p>Với mục tiêu xây dựng nền nông nghiệp bền vững và tạo ra những sản phẩm chất lượng, chúng tôi cam kết mang đến cho bạn những thông tin chính xác và cập nhật nhất về trang trại. Chúng tôi tin rằng nông nghiệp không chỉ là một ngành nghề, mà còn là một phong cách sống, gắn kết con người với tự nhiên và mang lại những lợi ích về sức khỏe và môi trường.</p>
                                                <div className="info">
                                                    <ul className="list-info">
                                                        <li><i className="fa fa-map-marker"></i> <span>164 Y La, Duong Noi, Ha Dong Ha Noi, VN</span></li>
                                                        <li><i className="fa fa-phone"></i><span> Phone: <a href="callto:1900887887">+84 190-088-7887</a></span></li>
                                                        <li><i className="fa fa-fax"></i><span> Fax: <a href="callto:1900887887">+84 190-088-7887</a></span></li>
                                                        <li><i className="fa fa-envelope"></i><span> Email: <a href="mailto:info@ifarm.com">info@ifarm.com</a></span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" style={{float:"left"}}>
                                    <div className="footer-menu-list">
                                        <div className="col-xs-12 col-sm-6 col-md-3 list-style">
                                            <aside id="nav_menu-2" className="widget widget_nav_menu"><h4 className="widget-title widget-title-border">Categories</h4> 
                                                <div className="menu-category-container">
                                                    <ul id="menu-category" className="menu">
                                                        <li id="menu-item-1387" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-1387"><a href="https://foodfarm.arrowtheme.com/product-category/meat/">Meat</a></li>
                                                        <li id="menu-item-426" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-426"><a href="https://foodfarm.arrowtheme.com/product-category/vegetables/">Vegetables</a></li>
                                                        <li id="menu-item-427" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-427"><a href="https://foodfarm.arrowtheme.com/product-category/fruits/">Fruits</a></li>
                                                        <li id="menu-item-428" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-428"><a href="https://foodfarm.arrowtheme.com/product-category/animals/">Animals</a></li>
                                                        <li id="menu-item-425" className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-425"><a href="https://foodfarm.arrowtheme.com/product-category/organic-foods/">Organic Foods</a></li>
                                                    </ul>
                                                </div>
                                            </aside>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-3 list-style">
                                            <aside id="nav_menu-3" className="widget widget_nav_menu"><h4 className="widget-title widget-title-border">Information</h4>
                                                <div className="menu-information-container">
                                                    <ul id="menu-information" className="menu">
                                                        <li id="menu-item-429" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-429"><a href="#">Returns</a></li>
                                                        <li id="menu-item-430" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-430"><a href="#">Delivery</a></li>
                                                        <li id="menu-item-431" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-431"><a href="#">Services</a></li>
                                                        <li id="menu-item-432" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-432"><a href="#">Gift Cards</a></li>
                                                        <li id="menu-item-433" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-433"><a href="#">Manufacturers</a></li>
                                                        <li id="menu-item-434" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-434"><a href="#">Discount Code</a></li>
                                                    </ul>
                                                </div>
                                            </aside>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-3 list-style">
                                            <aside id="nav_menu-4" className="widget widget_nav_menu"><h4 className="widget-title widget-title-border">Policies</h4>
                                                <div className="menu-policies-container">
                                                    <ul id="menu-policies" className="menu">
                                                        <li id="menu-item-435" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-435"><a href="#">Terms Of Service</a></li>
                                                        <li id="menu-item-436" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-436"><a href="#">Privacy</a></li>
                                                        <li id="menu-item-437" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-437"><a href="#">Security</a></li>
                                                        <li id="menu-item-438" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-438"><a href="#">Terms Of Use</a></li>
                                                    </ul>
                                                </div>
                                            </aside>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-3 list-style">
                                            <aside id="text-4" className="widget widget_text"><h4 className="widget-title widget-title-border">Find Us</h4>
                                                <div className="textwidget">
                                                    <div className="menu-footer-content widget_nav_menu_findus">
                                                        <ul className="footer-menu">
                                                            <li className="page_item"><a href="#" target="_blank" rel="noopener"><i className="fa fa-facebook-square"></i> Facebook</a></li>
                                                            <li className="page_item"><a href="#" target="_blank" rel="noopener"><i className="fa fa-x-twitter-square"></i> Twitter</a></li>
                                                            <li className="page_item"><a href="#" target="_blank" rel="noopener"><i className="fa fa-google-plus-square"></i> Google +</a></li>
                                                            <li className="page_item"><a href="#" target="_blank" rel="noopener"><i className="fa fa-youtube-square"></i> Youtube</a>
                                                            </li><li className="page_item"><a href="#" target="_blank" rel="noopener"><i className="fa fa-linkedin-square"></i> Linkedin</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                    <div className="newsletter-footer">
                                        <div className="newsletter-title widget-title-border text-white">
                                            <h4>Signup Newsletter</h4>
                                        </div>
                                        <aside id="mc4wp_form_widget-3" className="widget widget_mc4wp_form_widget">
                                            <form id="mc4wp-form-1" className="mc4wp-form mc4wp-form-127" method="post" data-id="127" data-name="">
                                                <div className="mc4wp-form-fields">
                                                    <input type="email" name="EMAIL" className="form-control form-control float-left mr-1"  placeholder="Email address ..." required=""/>
                                                    <button type="submit" title="Subscribe" className="btn btn-default">
                                                        <span><span>Subscribe Me</span></span>
                                                    </button>
                                                </div>
                                            </form>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </footer>
    );
}