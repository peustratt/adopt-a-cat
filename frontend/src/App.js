import { useState, useEffect } from "react";
import styled from "styled-components";
import server from "./api/server";
import { GlobalStyle, ThemeProvider, theme } from "./GlobalStyles";

import Cat from "./components/Cat";
import NewCat from "./components/NewCat";

function App() {
  const [cats, setCats] = useState([]);
  const [isAddingCat, setIsAddingCat] = useState(false);

  const handleDeleteCat = async (id) => {
    try {
      const response = await server.delete(`/cats/${id}`);
      setCats(cats.filter((cat) => cat._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCats = async () => {
      try {
        const response = await server.get("/cats");
        setCats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCats();
  }, []);

  const catsEl = cats.map((cat) => (
    <Cat
      key={cat._id}
      cat={cat}
      setCats={setCats}
      handleDeleteCat={handleDeleteCat}
    />
  ));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppStyled className="App">
        <div className="cats-wrapper">
          <div className="top-bar">
            <h2>Cats List</h2>
            <button onClick={() => setIsAddingCat((prev) => !prev)}>
              Add new Cat
            </button>
          </div>
          <div className="cats">{catsEl}</div>
        </div>
        <div>{isAddingCat && <NewCat setCats={setCats} setIsAddingCat={setIsAddingCat}/>}</div>
      </AppStyled>
    </ThemeProvider>
  );
}

export default App;

const AppStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .cats-wrapper {
    border: 2px solid black;
    width: fit-content;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;

    > button {
      border-radius: 10px;
      border: none;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .cats {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
  }
`;
