import React from "react";

const steps = [
  {
    content: () => (
      <div>
        <p>Welcome to the Marvel Catalog!</p>
        <p>
          Here, you're going to find all the marvel characters, beyond exploring
          their details and customizing them!
        </p>
        <p>Enjoy!</p>
      </div>
    ),
  },
  {
    selector: ".topbar__search--input-inner",
    content: () => (
      <div>
        <p>Here, you can search for a specific character!</p>
        <p>Just type and wait for the results to be refreshed!</p>
      </div>
    ),
  },
  {
    selector: ".char-card__root",
    content: () => (
      <div>
        <p>
          Here, you have a character card, where you can see a little summary
          about him!
        </p>
        <p>You may want to click it to get his details page...</p>
      </div>
    ),
  },
];

export default steps;
