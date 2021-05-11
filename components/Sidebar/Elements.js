import styled from '@emotion/styled';
import { Avatar, Button, IconButton } from '@material-ui/core';

export const Container = styled('div')`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Header = styled('div')`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

export const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

export const IconsContainer = styled('div')`

`;

export const Search = styled('div')`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 2px;
  margin: 12px 40px 20px;
    background: whitesmoke;
    border-radius: 20px;
`;

export const SearchInput = styled('input')`
  outline-width: 0;
  border: none;
  flex: 1;
  background: whitesmoke;
`;

export const SidebarButton = styled(Button)`
  width: 100%;
  // increase the priority of material ui button
  &&& {
    font-weight: bold;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

export const ProfileContainer = styled('div')`
  padding: 24px 16px;
  width: 100%;
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
  width: 34%;
  margin: 12px auto;
  padding: 12px 0;
  border-top: 2px solid #CCC;
  text-align: center;
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

export const CloseButtonWrapper = styled(IconButton)`
  &&& {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

export const ButtonWrapper = styled('div')`
  display: grid;
  place-items: center;
`;

export const SignOutButton = styled(Button)`
  &&& {
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-weight: 600;
    width: 30%;
    text-transform: none;
  }
`;

export const FooterContainer = styled('div')`
  position: sticky;
  bottom: 0;
  left: 0;
  background: white;
  padding: 10px 16px;
  width: 350px;
  display: flex;
  align-items: center;
  > button {
    margin-left: 30px;
  }
`;

export const InputContainer = styled('div')`
  text-align: center;
  padding : 30px 0;
  > div {
    width: 60%;
  }
`;

export const ButtonContainer = styled('div')`
  margin-top: 20px;
  text-align: right;
  > button:nth-of-type(2) {
    margin-left: 14px;
    background: #0194FF;
    &:disabled {
      background: gray;
    }
  }
`;

export const ErrorText = styled('p')`
  margin: 4px 0 0;
  color: red;
  font-size: 16px;
  font-weight: 500;
`;

export const UserListWrapper = styled('div')`
  margin-bottom: 20%;
`;
