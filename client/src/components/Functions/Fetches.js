//this function recieves an item Id and post it to the backend
export const addToCart = (id, setRerender, rerender) => {
  fetch("/api/add-to-cart", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemId: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status >= 300) {
        window.alert(data.message);
      } else {
        setRerender(!rerender);
      }
    })
    .catch((error) => {
      window.alert(error);
    });
};
//this function recievs an Id and deletes it from backend
export const deleteFromCart = (id, setRerender, rerender) => {
  fetch(`/api/delete-item/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      if (data.status >= 300) {
        window.alert(data.message);
      } else {
        setRerender(!rerender);
      }
    });
};

//this functions clear the cart from the DB
export const clearTheCart = () => {
  fetch("/api/clear-cart", { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      if (data.status >= 300) {
        window.alert(data.message);
      } else {
        console.log("cart cleared");
      }
    });
};
