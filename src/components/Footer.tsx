import { Container } from "@mui/material";

export const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <Container>
        <div className="footer-content">
          <div className="footer-content__part">Created by Chokan Dmytrii </div>{" "}
          <div className="footer-content__part footer-content__part-center">
            <p className="footer-content__link-info">
              Information about news and attached photos were taken from{" "}
              <a
                className="footer-content__link anchor"
                href="https://newsdata.io/">
                this API{" "}
              </a>{" "}
            </p>{" "}
            <p className="footer-content__link-info">
              Photo provided by{" "}
              <a
                className="footer-content__link anchor"
                href="https://www.flaticon.com/free-icons/no-photo"
                title="no photo icons">
                No photo icons created by Icon.doit - Flaticon
              </a>{" "}
            </p>{" "}
          </div>{" "}
          <div className="footer-content__part">
            {" "}
            Please contact me by{" "}
            <a
              className="footer-content__mail anchor"
              href="mailto: chokandmy@gmail.com">
              email!
            </a>
          </div>{" "}
        </div>
      </Container>
    </footer>
  );
};
