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
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate "
                </p>
              </div>
              <div className="col-12 col-md-5 offset-md-1">
                <div>
                  <img
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
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate "
                </p>
                <p>
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate "
                </p>
              </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-12 col-md-5">
                <img
                  className={`img-fluid ${styles.image}`}
                  src="/hostel/hostel_inside.jpg"
                />
              </div>
              <div className={`col-12 col-md-6 offset-md-1 `}>
                <p>
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate "
                </p>
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
