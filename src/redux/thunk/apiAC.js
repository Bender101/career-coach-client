import { addRecomendation } from "../actions/recomendationAction";

export const analizeAC = (data) => {
  return async (dispatch) => {
    if (data.method === "api") {
      try {
        const response = await fetch("/api/hh", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json();

          const resultId = result.resultId;
          return resultId;
        } else {
        }
      } catch (err) {
        console.log("Error analize: ", err);
      }
    } else if (data.method === "scrapping") {
      try {
        const response = await fetch("/scrap/hh", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const result = await response.json();

          const resultId = result.resultId;
          return resultId;
        } else {
        }
      } catch (err) {
        console.log("Error analize: ", err);
      }
    }
  };
};
