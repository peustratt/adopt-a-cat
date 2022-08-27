import { useEffect, useState } from "react";
import styled from "styled-components";

import server from "../api/server";

const NewCat = ({ setCats, setIsAddingCat }) => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await server.get("/tags");
        setTags(response.data.map((tag) => ({ ...tag, selected: false })));
      } catch (error) {
        console.log(error);
      }
    };
    getTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedTags = tags.filter((tag) => tag.selected);
      const response = await server.post("/cats", {
        name,
        tags: selectedTags.map((tag) => tag._id),
      });
      setCats((ṕrevCats) => [
        ...ṕrevCats,
        { ...response.data, tags: selectedTags },
      ]);
      setIsAddingCat(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelecteTag = (id) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag._id === id ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h3>New cat</h3>
      <div className="name-wrapper">
        <label htmlFor="cat-name">Name:</label>
        <input
          id="cat-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <StyledTag
            key={tag._id}
            onClick={() => handleSelecteTag(tag._id)}
            isSelected={tag.selected}
            className="tag"
          >
            {tag.description}
          </StyledTag>
        ))}
      </div>
      <button type="submit">Add Cat</button>
    </StyledForm>
  );
};

export default NewCat;

const StyledForm = styled.form`
  border: 2px solid black;
  width: fit-content;
  display: flex;
  flex-direction: column;

  .name-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    > input {
      width: 100%;
      border-radius: 10px;
    }
  }

  > button {
    border-radius: 10px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const StyledTag = styled.div`
  border: 2px solid black;
  width: fit-content;
  border-radius: 10px;
  padding: 5px;
  font-size: 14px;
  background: ${(props) => (props.isSelected ? "#4267B2" : "white")};
  border: ${(props) => (props.isSelected ? "none" : "1px solid black")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  font-weight: 600;
`;
