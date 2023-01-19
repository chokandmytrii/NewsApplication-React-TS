import { Grid, Container, InputAdornment, TextField } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { CardFull } from "./CardFull";
import { CardElement } from "./CardElement";
import { ArticleInterface } from "../App";

export const Main = ({
  findTopic,
  newsArray,
  oldTopic,
  addElements,
  quantity,
  NoPictures,
}: {
  findTopic: any;
  newsArray: Object[];
  oldTopic: string;
  addElements: any;
  quantity: number;
  NoPictures: string;
}) => {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container className="container" maxWidth="lg">
                <form
                  className="main__form form"
                  onChange={(event) => findTopic(event)}
                  noValidate
                  autoComplete="off">
                  <h3 className="form__title">Filter by keywords</h3>
                  <TextField
                    className="form__input"
                    id="input-with-icon-textfield"
                    variant="outlined"
                    placeholder={oldTopic}
                    sx={{
                      marginBottom: "40px",
                      width: "50%",
                      color: "#575757",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          sx={{ padding: "15px 10px" }}
                          position="start">
                          <svg
                            className="form__svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                              d="M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z"
                              fill="#575757"
                            />
                          </svg>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p className="form__result">Results: {newsArray.length}</p>
                </form>
                <Grid className="card" display="flex" container spacing={6}>
                  {newsArray
                    .slice(0, quantity)
                    .map((element: ArticleInterface) => (
                      <CardElement
                        id={element.id}
                        image={element.image_url}
                        date={element.pubDate}
                        title={element.title}
                        shortContent={element.shortContent}
                        shortDescription={element.shortDescription}
                        content={element.content}
                        description={element.description}
                        NoPictures={NoPictures}
                      />
                    ))}
                </Grid>
                <button
                  onClick={addElements}
                  className="card__btn btn"
                  type="button">
                  <span className="btn__text"> Show more </span>
                </button>
              </Container>
            </>
          }
        />
        {newsArray.map((element: ArticleInterface) => (
          <Route
            path={`/card/${element.id}`}
            element={
              <CardFull
                image={element.image_url}
                title={element.title}
                content={element.content}
                description={element.description}
                link={element.link}
                NoPictures={NoPictures}
              />
            }
          />
        ))}
      </Routes>
    </main>
  );
};
