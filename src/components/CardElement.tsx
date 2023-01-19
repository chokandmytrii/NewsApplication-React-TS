import { Card, CardMedia, Grid } from "@mui/material";
import NoPictures from "../img/NoPictures.png";

export const CardElement = ({
  id,
  image,
  date,
  title,
  shortContent,
  shortDescription,
  content,
  description,
}: {
  id: number | undefined;
  image: string | null | undefined;
  date: string | null | undefined;
  title: string | null | undefined;
  shortContent: string | null | undefined;
  shortDescription: string | null | undefined;
  content: string | null | undefined;
  description: string | null | undefined;
}) => {
  return (
    <Grid className="card__item" container item lg={4}>
      <Card className="news">
        <CardMedia
          className="news__img"
          sx={{ height: 217 }}
          image={image || NoPictures}
          title="news photo"
        />
        <div className="news__text text">
          <div className="text__date date">
            <svg
              className="date__svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none">
              <g opacity="0.6" clipPath="url(#clip0_466_331)">
                <path
                  d="M12 2.66675H3.99999C2.52724 2.66675 1.33333 3.86066 1.33333 5.33341V12.0001C1.33333 13.4728 2.52724 14.6667 3.99999 14.6667H12C13.4728 14.6667 14.6667 13.4728 14.6667 12.0001V5.33341C14.6667 3.86066 13.4728 2.66675 12 2.66675Z"
                  stroke="#363636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.33333 1.33337V4.00004"
                  stroke="#363636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 1.33337V4.00004"
                  stroke="#363636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.33333 6.66675H14.6667"
                  stroke="#363636"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_466_331">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="date__text">{date}</p>
          </div>
          <div className="text__description">
            <h4 className="text__title news__title">{title}</h4>
            <p className="text__content news__content">
              {shortContent ||
                shortDescription ||
                content ||
                description ||
                "No additional information"}
            </p>
          </div>
          <a className="news__button button" href={`/card/${id}`}>
            {" "}
            Read more
            <svg
              className="button__svg"
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.66829 0.162658C6.45593 0.379657 6.45593 0.730251 6.66975 0.945773L9.09665 3.39845L9.15268 3.448C9.36701 3.61309 9.6729 3.59589 9.86756 3.39698C9.97375 3.28848 10.0268 3.1475 10.0268 3.00653C10.0268 2.86407 9.97375 2.72236 9.86611 2.61386L7.43993 0.161182L7.38388 0.111806C7.16946 -0.0527212 6.86296 -0.0355811 6.66829 0.162658ZM0.477064 4.45064C0.208215 4.48481 0 4.71782 0 4.99989C0 5.30546 0.244364 5.55346 0.545455 5.55346H10.1338L6.66982 9.05423L6.62082 9.11077C6.45747 9.32725 6.4737 9.63843 6.66836 9.83734C6.88073 10.0536 7.22618 10.0543 7.43927 9.83882L11.8393 5.39182L11.8878 5.33613C11.9616 5.23874 12 5.11983 12 4.99989C12 4.92829 11.9862 4.8567 11.9585 4.78879C11.8742 4.58139 11.6756 4.44632 11.4545 4.44632H0.545455L0.477064 4.45064Z"
                fill="#363636"
              />
            </svg>
          </a>
        </div>
      </Card>
    </Grid>
  );
};
