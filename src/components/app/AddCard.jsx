import React, { useState } from "react";

const AddCard = ({ addCard }) => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <p>Card Title</p>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        onClick={() => {
          setTitle("");
          addCard(title);
        }}
      >
        Add Card
      </button>
    </div>
  );
};

export default AddCard;
