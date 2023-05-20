import { BASE_URL } from "../config";



const login = async (user) => {
    try {
      const res = await fetch(BASE_URL + "employee/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };


  export {login};