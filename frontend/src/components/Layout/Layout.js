// import Footer from "./Footer";
import Header from "../Layout/Header.js";
import Footer from "./Footer.js";
import {Helmet} from "react-helmet";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,author,keywords}) => {
    return ( 
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            {/* <Header/>
            <main style={{minHeight:'85vh',padding: '20px','@media only screen and (max-width: 768px)': { padding: '10px' } }}>
                <ToastContainer autoClose={1000} />
                {children}
                </main>
            <Footer/> */}
             <Header />
    <main style={{ minHeight: '75vh', padding: '20px', boxSizing: 'border-box' }}>
        <ToastContainer autoClose={1000} />
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            {children}
        </div>
    </main>
    <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title:"Mobile Application",
    description:'MERN STACK',
    keywords:"MongoDB,Express,React,Node",
    author:'Anuj Vaid',

};
 
export default Layout;