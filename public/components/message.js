import React from "react";

export default function Message({ name, message, date }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{message}</p>
      <time>{date}</time>
    </div>
  );
}
