import { Container } from "@mui/material";

export const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header-content">
          <h1 className="header-content__name">Single Page News Api</h1>
          <a className="header-content__anchor anchor" href="#contact">
            My Contacts
          </a>
        </div>
      </Container>
    </header>
  );
};
