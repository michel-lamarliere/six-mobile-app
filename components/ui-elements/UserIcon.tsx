import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";

const UserIcon: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const [iconPath, setIconPath] = useState(
    require("../../assets/icons/user/icon_0.png")
  );

  const getIconUrl = (number: number): string => {
    switch (number) {
      case 0:
        return require("../../assets/icons/user/icon_0.png");
      case 1:
        return require("../../assets/icons/user/icon_1.png");
      case 2:
        return require("../../assets/icons/user/icon_2.png");
      case 3:
        return require("../../assets/icons/user/icon_3.png");
      case 4:
        return require("../../assets/icons/user/icon_4.png");
      case 5:
        return require("../../assets/icons/user/icon_5.png");
      case 6:
        return require("../../assets/icons/user/icon_6.png");
      case 7:
        return require("../../assets/icons/user/icon_7.png");
      case 8:
        return require("../../assets/icons/user/icon_8.png");
      case 9:
        return require("../../assets/icons/user/icon_9.png");
      case 10:
        return require("../../assets/icons/user/icon_10.png");
      case 11:
        return require("../../assets/icons/user/icon_11.png");
      default:
        return require("../../assets/icons/user/icon_0.png");
    }
  };

  useEffect(() => {
    const iconPath = getIconUrl(userState.icon ? userState.icon : 0);

    setIconPath(iconPath);
  }, [userState.icon]);

  return <Image source={iconPath} />;
};

export default UserIcon;
