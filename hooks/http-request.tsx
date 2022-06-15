import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import useCheckUserExists from "./check-user-exists";

import { BACKEND_API_URL } from "@env";

export const useHttpRequest = () => {
  const { checkUserExists } = useCheckUserExists();

  const userData = useSelector((state: RootState) => state.user);

  const sendRequest = async (args: {
    url: string;
    method: "POST" | "GET" | "PATCH" | "DELETE";
    body?: string | null;
  }) => {
    const { url, method, body } = args;

    const response = await fetch(`${BACKEND_API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${userData.token}`,
      },
      body,
    });

    const responseData = await response.json();

    checkUserExists(response, responseData);

    return { response, responseData };
  };

  const sendData = async (
    _id: string,
    dateAndTaskStr: string,
    prevLevel: number
  ) => {
    const date = dateAndTaskStr.split("_")[0];
    const task = dateAndTaskStr.split("_")[1];

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/log/task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `BEARER ${userData.token}`,
        },
        body: JSON.stringify({
          _id,
          date,
          task,
          levelOfCompletion: prevLevel !== 2 ? prevLevel + 1 : 0,
        }),
      }
    );

    const responseData = await response.json();

    checkUserExists(response, responseData);

    return responseData;
  };

  return { sendRequest, sendData };
};
