import { useMutation } from "react-query";

const API_URL = "https://alojamundobackend.onrender.com/accomodation";

const useCreateAccommodation = () => {
  return useMutation((accommodationData) => {
    return fetch(API_URL, {
      method: "POST",
      body: accommodationData,
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
  });
};

export default useCreateAccommodation;
