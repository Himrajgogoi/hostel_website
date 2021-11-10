import Head from "next/head";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Layout = ({children}) =>{
    return(
        <div>
            <Head>
              <link rel="icon" href="/logo_fvt.ico"></link>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link
                href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap"
                rel="stylesheet"
               />
            </Head>
            <Header/>
            {children}
            <style jsx global>{`
        h2,
        p,
        small {
          font-family: "Raleway", sans-serif;
        }

        h5,
        h1 {
          font-family: "Raleway", sans-serif;
          font-weight: bold;
        }
      `}</style>
        </div>
    )
}

export default Layout