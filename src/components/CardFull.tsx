import { Container, Card, CardContent } from "@mui/material";

export const CardFull = ({
  image,
  title,
  content,
  description,
  link,
  NoPictures,
}: {
  image: string | null | undefined;
  title: string | null | undefined;
  content: string | null | undefined;
  description: string | null | undefined;
  link: string | null | undefined;
  NoPictures: string;
}) => {
  return (
    <div className="article-wrapper">
      <div className="article__background background">
        <img
          className="background__picture"
          src={image || NoPictures}
          alt="Article background"
        />
      </div>
      <Container className="container" maxWidth="lg">
        <Card sx={{ marginBottom: "25px" }}>
          <CardContent sx={{ padding: "35px 75px 50px" }} className="article">
            <h3 className="article__title">{title}</h3>
            <p className="article__text">
              {content || description || "No additional information"}
            </p>
            {typeof link === "string" ? (
              <p className="article__link">
                Link to origin info:<a href={link}>{link}</a>
              </p>
            ) : (
              <p className="article__link">"No additional links"</p>
            )}
          </CardContent>
        </Card>
        <a className="article__button button" href="/">
          <svg
            className="button__svg-card"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.33171 0.162658C5.54407 0.379657 5.54407 0.730251 5.33025 0.945773L2.90334 3.39845L2.84731 3.448C2.63299 3.61309 2.3271 3.59589 2.13244 3.39698C2.02625 3.28848 1.97316 3.1475 1.97316 3.00653C1.97316 2.86407 2.02625 2.72236 2.13389 2.61386L4.56007 0.161182L4.61612 0.111806C4.83054 -0.0527212 5.13704 -0.0355811 5.33171 0.162658ZM11.5229 4.45073C11.7918 4.48491 12 4.71792 12 4.99998C12 5.30555 11.7556 5.55355 11.4545 5.55355H1.86618L5.33018 9.05432L5.37918 9.11086C5.54253 9.32734 5.5263 9.63852 5.33164 9.83743C5.11927 10.0537 4.77382 10.0544 4.56073 9.83891L0.160727 5.39191L0.112206 5.33622C0.0383835 5.23883 0 5.11992 0 4.99998C0 4.92839 0.0138178 4.85679 0.0414543 4.78889C0.125817 4.58148 0.324364 4.44641 0.545454 4.44641H11.4545L11.5229 4.45073Z"
              fill="#363636"
            />
          </svg>
          Back to homepage
        </a>
      </Container>
    </div>
  );
};
