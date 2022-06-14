import React from "react";

import EditProfileContainer from "../../containers/EditProfileContainer";

interface Props {
  navigation: any;
}

const EditIcon: React.FC<Props> = (props) => {
  return (
    <EditProfileContainer
      navigation={props.navigation}
      title={"Modifier Icône"}
    ></EditProfileContainer>
  );
};

export default EditIcon;
