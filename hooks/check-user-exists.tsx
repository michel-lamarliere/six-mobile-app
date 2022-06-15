import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useUserClass } from "../classes/user";

const useCheckUserExists = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const User = useUserClass();

  const checkUserExists = (
    response: Response,
    responseData: { inexistantUser: boolean }
  ) => {
    if (response.status === 401 && responseData.inexistantUser) {
      User.logOut();
      return;
    }
  };

  return { checkUserExists };
};

export default useCheckUserExists;
