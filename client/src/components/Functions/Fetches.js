export const addToCart = (id, setRerender, rerender) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-to-cart`, {
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

export const deleteFromCart = (id, setRerender, rerender) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete-item/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status >= 300) {
                window.alert(data.message);
            } else {
                setRerender(!rerender);
            }
        });
};

export const clearTheCart = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clear-cart`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status >= 300) {
                window.alert(data.message);
            } else {
                console.log("cart cleared");
            }
        });
};
