import styled from "@emotion/styled";

import { IconButton, Avatar } from '@material-ui/core';

export const Container = styled('div')`
  display: flex;
`;

export const ChatContainer = styled('div')`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const ChatScreenContainer = styled('div')``;

export const Header = styled('div')`
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

export const UserAvatarContainer = styled('div')`
  cursor: pointer;
`;

export const HeaderInformation = styled('div')`
cursor: pointer;
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

export const HeaderIcons = styled('div')``;

export const MessageContainer = styled('div')`
  padding: 30px;
  background: #e5ded8;
  min-height: 90vh;
`;

export const EndOfMessage = styled('div')`
  margin-bottom: 50px;
`;

export const ConversationListContainer = styled('div')``;

export const InputContainer = styled('form')`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 200;
`;

export const Input = styled('input')`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 20px;
  background: whitesmoke;
  padding: 16px;
  margin: 0 15px 0;
`;

export const MessageElement = styled('p')`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
  word-break: break-word;
`;

export const Timestamp = styled('span')`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

export const Sender = styled(MessageElement)`
  margin-left: auto;
  background: #dcf8c6;
`;

export const Reciever = styled(MessageElement)`
  background: whitesmoke;
  text-align: left;
`;

export const ProfileContainer = styled('div')`
  padding: 24px 16px;
  width: 100%;
  min-width: 350px;
  position: relative;
`;

export const ProfileImageContainer = styled('div')`
  height: 16vh;
  display: grid;
  place-items: center;
  > img {
    height: inherit;
    width: auto;
    border-radius: 50%;
  }
`;

export const ProfileDetailsSection = styled('div')`
  margin: 30px auto;
  padding: 12px 0;
  border-top: 2px solid #CCC;
  text-align: center;
`;

export const CloseButtonWrapper = styled(IconButton)`
  &&& {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

export const TextWrapper = styled('div')`
  font-size: ${props => props.fs ? props.fs : '14px'};
  line-height: ${props => props.lh ? props.lh : '19px'};
  ${props => props.bold && 'font-weight: bold;'}
  ${props => props.uppercase && 'text-transform: uppercase;'}
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 2px 0;
`;

export const UserAvatar = styled(Avatar)`
  &&& {
    height: 100%;
    width: 46%;
  }
`;
