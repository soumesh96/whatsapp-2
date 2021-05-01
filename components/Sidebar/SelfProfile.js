import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import {
  UserAvatar,
  ProfileContainer,
  ProfileImageContainer,
  ProfileDetailsSection,
  TextWrapper,
  CloseButtonWrapper,
  ButtonWrapper,
  SignOutButton,
} from "./Elements";

const SelfProfile = ({
  isProfilePageActive,
  setIsProfilePageActive,
  userDetails,
  onSignOut,
}) => {
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsProfilePageActive(open);
  };

  const list = () => (
    <ProfileContainer role="presentation">
      <CloseButtonWrapper onClick={toggleDrawer(false)}>
        <CloseIcon />
      </CloseButtonWrapper>
      <ProfileImageContainer>
        <img src={userDetails?.photoURL} alt="noProfile" />
      </ProfileImageContainer>
      <ProfileDetailsSection>
        <TextWrapper uppercase fs="20px" lh="22px" bold>
          {userDetails?.displayName}
        </TextWrapper>
        <TextWrapper>{userDetails?.email}</TextWrapper>
        <TextWrapper>{userDetails?.phoneNumber}</TextWrapper>
      </ProfileDetailsSection>
      <ButtonWrapper>
        <SignOutButton onClick={onSignOut}>Sign Out</SignOutButton>
      </ButtonWrapper>
    </ProfileContainer>
  );

  return (
    <React.Fragment>
      <UserAvatar src={userDetails?.photoURL} onClick={toggleDrawer(true)} />
      <SwipeableDrawer
        anchor="top"
        open={isProfilePageActive}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default SelfProfile;
