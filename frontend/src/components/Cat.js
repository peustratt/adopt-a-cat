import { useEffect } from "react";
import styled from "styled-components";
import server from "../api/server";

const Cat = ({ cat, setCats, handleDeleteCat }) => {
  const date = new Date(cat.createdAt);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const handleFavorite = async () => {
    try {
      await server.get(
        `/cats/${cat.favorited ? "unfavorite" : "favorite"}/${cat._id}`
      );
      setCats((prevCats) =>
        prevCats.map((c) =>
          c._id === cat._id ? { ...c, favorited: !c.favorited } : c
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CatContainer isFavorited={cat.favorited}>
      <div className="info">
        <p>Nome: {cat.name}</p>
        <p>Added Date: {`${day}/${month}/${year}`}</p>
        <ul className="tags">
          {cat.tags.map((tag) => (
            <li key={tag._id}>{tag.description}</li>
          ))}
        </ul>
      </div>
      <div className="btns-wrapper">
        <button className="delete" onClick={() => handleDeleteCat(cat._id)}>
          Delete
        </button>
        <button className="favorite" onClick={handleFavorite}>
          {cat.favorited ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </CatContainer>
  );
};

export default Cat;

const CatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 2px solid black;
  width: fit-content;
  border-radius: 10px;

  .info {
    line-height: 0.5;
  }

  .btns-wrapper {
    display: grid;
    gap: 10px;

    > button {
      border-radius: 10px;
      border: none;
      min-width: 100px;
      &:hover {
        transform: scale(1.1);
      }
    }

    .delete {
      background-color: #ffcccb;
    }
    .favorite {
      background: ${(props) => (props.isFavorited ? "#ffcccb" : "#90ee90")};
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 5px;

    li {
      background: #4267B2;
      color: white;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      padding: 7px 10px;
    }
  }
`;
