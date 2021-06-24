import React from "react";
import Head from "next/head";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import styles from "../styles/Home.module.css";

function brief_history() {
  return (
    <div>
      <Head>
        <title>Octave | Brief History</title>
        <link rel="icon" href="/logo_fvt.ico"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div className={styles.alternate_container}>
        <div className={styles.alternate_content}>
          <div className={styles.hover_underline_animation}>
            <div className="row">
              <div className="col-12">
                <h2>Brief History</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <p>
                 In the cusp of spring 1983, 23rd February, the advent of this hostel came into fruitition. Dr. Atul Bordoloi, Department of Physics(retd .) and Dr. Kulanath Sarmah, Department of Chemistry, were the first boarders as well as assigned Superintendents
                 of this hostel. As the hostel was in need of incumbents, boarders from hostel 1 to 5 were shuffled and they made new nesting in this youngest hostel of the college in the erstwhile dumping ground of the college and the adjoining villages. 
                 But it was not until November 1984 that the hostel got its existing name, Octave, with its boarders having straddled diverse frontiers of the length and breadth of the planet. Anjan Das, an Octavian from the 1984-88 batch bears this privilege
                 for posterity to have named this place as such.
                </p>
              </div>
              <div className="col-12 col-md-5 offset-md-1">
                <div>
                  <img alt="hostel image"
                    className={`img-fluid ${styles.image}`}
                    src="/hostel/hostel_sidegate.jpg"
                  />
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-12">
                <p>
                  The hostel has been under the supervision of several Superintendents, namely the aforementioned firsts, Dr. Manabendra Bhuyan, Dr Prasanna Khaund, Dr Parimal Bakul Barua for a lengthy tenure of 17 years, Dr. Dilip Kakati and the current superintendent 
                  Mr. Bijoy Roy. The rear side of Octave has now been demarcated by the boundaries of Assam Women's University, thereby curbing the boarders of their hitherto favourite place for nighttime pursuits in the southern side. For many years, this hostel had 
                  singular water supply arranged and aided by the Octave batch of 1995-99 which was a boon for its boarders in comparison to the acute water shortage faced by the Joencovites and hence mitigating the August water borne epidemics.
                </p>
                
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-12 col-md-5">
                <img alt="hostel image"
                  className={`img-fluid ${styles.image}`}
                  src="/hostel/hostel_inside.jpg"
                />
              </div>
              <div className={`col-12 col-md-6 offset-md-1 `}>
                <p>
                  The hostel celebrated its Silver Jubliee on 27th and 28th April, 2011 with pomp and grandeur. That coming together of 27 passout batches along with its then-existing boarders was a festive and emotional highpoint of joy and nostalgia. The moments of joy in the faces
                  of the families of 4 departed Octavian brothers brought unforseen cherished sanctity of a brotherhood beyond compare. Long Live Octave, long live the spirit of Octavians.
                </p>
                <small>- Hrishikesh Mali, former boarder of Octave.</small>
              </div>
            </div>
          </div>
        </div>

      </div>
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
      <Footer />
    </div>
  );
}

export default brief_history;
