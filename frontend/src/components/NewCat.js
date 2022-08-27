import { useState } from "react";
import styled from "styled-components";

import server from "../api/server";

const NewCat = ({ setCats }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await server.post("/cats", { name });
      setCats((ṕrevCats) => [...ṕrevCats, response.data]);
    } catch (error) {
      console.log(error);
    }
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
`;
