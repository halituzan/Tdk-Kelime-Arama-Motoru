import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { fetchTdk, fetchTdkSearching } from "../features/sozlukAction";
import { useSelector, useDispatch } from "react-redux";

export default function Search({ setIsSearch }) {
  const [searching, setSearching] = useState("");
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key == 13) {
      if (searching === "") {
        dispatch(fetchTdk(Math.floor(Math.random() * 92411)));
      }
      if (searching !== "") {
        dispatch(fetchTdkSearching(searching));
      }
    }
  };
  return (
    <InputGroup className="container my-3 w-75">
      <Form.Control
        placeholder="Kelime Ara"
        aria-label="Kelime Ara"
        aria-describedby="basic-addon2"
        value={searching}
        onChange={(e) => setSearching(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={() => dispatch(fetchTdkSearching(searching))}
      >
        Ara
      </Button>
    </InputGroup>
  );
}
