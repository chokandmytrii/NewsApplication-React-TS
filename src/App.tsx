import { useState, useEffect, useLayoutEffect, ChangeEvent } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import "./Styles/style.scss";

export interface ArticleInterface {
  id?: number;
  description?: string | null | undefined;
  content?: string | null | undefined;
  title?: string | null | undefined;
  shortContent?: string | null | undefined;
  shortDescription?: string | null | undefined;
  pubDate?: string | null | undefined;
  image_url?: string | undefined;
  link?: string | null | undefined;
}

function App() {
  const [newsArray, changeNews] = useState<Array<Object>>([{}]);
  const [topic, changeTopic] = useState<string>("");
  const [oldTopic, setOldTopic] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(6);

  class Article implements ArticleInterface {
    id?: number;
    description?: string | null | undefined;
    content?: string | null | undefined;
    title?: string | null | undefined;
    shortContent?: string | null | undefined;
    shortDescription?: string | null | undefined;
    pubDate?: string | null | undefined;
    image_url?: string | undefined;
    link?: string | null | undefined;

    constructor(
      id: number,
      description: string | null | undefined,
      content: string | null | undefined,
      title: string | null | undefined,
      shortContent: string | null | undefined,
      shortDescription: string | null | undefined,
      pubDate: string | null | undefined,
      image: string | undefined,
      link: string | null | undefined
    ) {
      this.id = id;
      this.description = description;
      this.content = content;
      this.title = title;
      this.shortContent = shortContent;
      this.shortDescription = shortDescription;
      this.pubDate = pubDate;
      this.image_url = image;
      this.link = link;
    }
  }

  const newsData = async () => {
    let localValue = localStorage.getItem("news");
    let newsRes: object[] = [];
    let newsArr;

    if (localValue !== null && topic === "") {
      newsArr = JSON.parse(localValue);
      setOldTopic(getTopic());
    }

    if (topic !== "") {
      const data = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_15832a85358a0f832579f185008f21de2d19a&q=${topic}&language=en`
      );
      const result = await data.json();
      newsArr = result.results;
      localStorage.setItem("news", JSON.stringify(newsArr));
    }

    newsArr.forEach((element: ArticleInterface, index: number) => {
      let shortContent: string | null = null;
      let shortDescription: string | null = null;
      let topicIndex: undefined | number;
      let searchedWord: undefined | string;
      const topicDivider = topic.split("%20OR%20");

      if (topicDivider.length > 1) {
        for (const value in topicDivider) {
          if (element.content?.includes(topicDivider[value])) {
            topicIndex = element.content?.indexOf(topicDivider[value]);
            searchedWord = topicDivider[value];
          } else {
            topicIndex === undefined && (topicIndex = undefined);
          }
        }

        if (topicIndex === undefined) {
          for (const value in topicDivider) {
            if (element.description?.includes(topicDivider[value])) {
              topicIndex = element.description?.indexOf(topicDivider[value]);
              searchedWord = topicDivider[value];
            } else {
              topicIndex === undefined && (topicIndex = undefined);
            }
          }
        }
      } else {
        topicIndex =
          element.content?.indexOf(topic) ||
          element.description?.indexOf(topic);
        searchedWord = topic;
      }

      let topicFinPosition: number | null = null;
      let topicLengthNumb: number;
      if (typeof topicIndex === "number" && typeof searchedWord === "string") {
        topicLengthNumb = searchedWord.length;
      } else {
        topicLengthNumb = 0;
      }
      if (topicIndex !== -1 && typeof topicIndex === "number") {
        topicFinPosition = topicIndex + topicLengthNumb;
      }

      const cuttingToShort = (
        elementName: string,
        newElementName: string | null
      ) => {
        if (
          typeof topicIndex === "number" &&
          typeof topicFinPosition === "number"
        ) {
          if (topicFinPosition < 97) {
            newElementName = elementName.slice(0, 97) + "...";
          } else {
            const topicDivider = elementName.slice(topicFinPosition);
            if (topicDivider.length > 97 - topicLengthNumb) {
              newElementName =
                "..." +
                elementName.slice(
                  topicIndex,
                  topicFinPosition + 94 - topicLengthNumb
                ) +
                "...";
            } else {
              newElementName =
                "..." + elementName.slice(elementName.length - 97);
            }
          }
        } else {
          newElementName = elementName.slice(0, 97) + "...";
        }
        return newElementName;
      };

      if (typeof element.content === "string" && element.content.length > 100) {
        shortContent = cuttingToShort(element.content, shortContent);
      } else {
        shortContent = null;
      }

      if (
        element.content === null &&
        typeof element.description === "string" &&
        element.description.length > 100
      ) {
        shortDescription = cuttingToShort(
          element.description,
          shortDescription
        );
      } else {
        shortDescription = null;
      }

      let cutDate: string;
      if (typeof element.pubDate === "string") {
        cutDate = element.pubDate.split(" ")[0];
      } else {
        return;
      }

      const newDate: number = Date.parse(cutDate);
      let newDateString: string = new Date(newDate).toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }
      );

      const position: number = newDateString.indexOf(",");
      const checkDate: number = +newDateString.slice(position - 2, position);

      let addDate: string;
      if (checkDate === 1 || checkDate === 21 || checkDate === 31) {
        addDate = "st";
      } else if (checkDate === 2 || checkDate === 22) {
        addDate = "nd";
      } else if (checkDate === 3 || checkDate === 23) {
        addDate = "rd";
      } else {
        addDate = "th";
      }
      newDateString =
        newDateString.slice(0, position) +
        addDate +
        newDateString.slice(position);

      const newArticle = new Article(
        index,
        element.description,
        element.content,
        element.title,
        shortContent,
        shortDescription,
        newDateString,
        element.image_url,
        element.link
      );
      newsRes.push(newArticle);
    });

    function compareTitles(a: ArticleInterface, b: ArticleInterface) {
      const topicDivider = topic.split("%20OR%20");

      function topicCheck(elem: ArticleInterface) {
        for (let i = 0; i < topicDivider.length; i++) {
          if (elem.title?.includes(topicDivider[i])) {
            return true;
          }
        }
      }

      if (typeof a.title === "string" && typeof b.title === "string") {
        let firstCheck;
        let secondCheck;
        if (topicDivider.length > 1) {
          firstCheck = topicCheck(a);
          secondCheck = topicCheck(b);
          if (secondCheck === undefined) {
            secondCheck = false;
          }
          if (firstCheck === undefined) {
            firstCheck = false;
          }
        } else {
          firstCheck = a.title.includes(topic);
          secondCheck = b.title.includes(topic);
        }

        if (firstCheck === true && secondCheck === false) {
          return -1;
        }
        if (firstCheck === false && secondCheck === true) {
          return 1;
        }
        return 0;
      } else {
        return 0;
      }
    }

    newsRes.sort(compareTitles);

    changeNews(newsRes.slice());
  };

  const changeTopicElements = (topicClass: string) => {
    let elements = document.querySelectorAll(topicClass);
    const topicDivider = topic.split("%20OR%20");
    for (let i = 0; i < topicDivider.length; i++) {
      elements.forEach((element) => {
        let title = element.innerHTML;
        let newTitle: undefined | string = "";

        const topicIndex = title.indexOf(topicDivider[i]);
        let topicLeng;
        if (topicIndex !== -1) {
          topicLeng = topicIndex + topicDivider[i].length;
          newTitle = `${title.slice(
            0,
            topicIndex
          )}<span class="title__search">${title.slice(
            topicIndex,
            topicLeng
          )}</span>${title.slice(topicLeng)}`;
          element.innerHTML = newTitle;
        }
      });
    }
  };

  const findTopic = (event: ChangeEvent<HTMLInputElement>) => {
    let wordExpression;
    let spaceDivider = event.target.value.split(" ");
    if (spaceDivider.length > 1) {
      wordExpression = spaceDivider[0];
      for (let i = 1; i < spaceDivider.length; i++) {
        if (
          spaceDivider[i] !== "and" &&
          spaceDivider[i] !== "or" &&
          spaceDivider[i] !== "the" &&
          spaceDivider[i] !== "a" &&
          spaceDivider[i] !== "an"
        ) {
          wordExpression += "%20OR%20" + spaceDivider[i];
        }
      }
    } else {
      wordExpression = spaceDivider[0];
    }

    changeTopic(wordExpression);
  };

  const setTopic = () => {
    if (topic !== "") {
      localStorage.setItem("topic", JSON.stringify(topic));
    }
  };

  const getTopic = () => {
    let newValue;
    let returnValue;
    let value = localStorage.getItem("topic");
    if (typeof value === "string") {
      newValue = JSON.parse(value);
    }
    newValue = newValue.split("%20OR%20");
    if (newValue.length > 1) {
      returnValue = newValue[0];
      for (let i = 1; i < newValue.length; i++) {
        returnValue += " " + newValue[i];
      }
      return returnValue;
    } else {
      return newValue[0];
    }
  };

  const addElements = () => {
    const btnBlock = document.querySelector(".card__btn");
    setQuantity((prevValue) => prevValue + 4);
    btnBlock?.classList.add("btn-disabled");
  };

  const clearBtn = () => {
    const btnBlock = document.querySelector(".card__btn");
    btnBlock?.classList.contains("btn-disabled") &&
      btnBlock?.classList.remove("btn-disabled");
    setQuantity(6);
  };

  useEffect(() => {
    newsData();
    setTopic();
    clearBtn();
  }, [topic]);

  useLayoutEffect(() => {
    changeTopicElements(".news__title");
    changeTopicElements(".news__content");
  });

  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <Header />
        <Main
          findTopic={findTopic}
          newsArray={newsArray}
          oldTopic={oldTopic}
          addElements={addElements}
          quantity={quantity}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
