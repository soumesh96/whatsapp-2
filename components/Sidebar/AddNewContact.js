import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { Divider, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import { useAuthState } from "react-firebase-hooks/auth";

import Modal from "../Common/Modal";
import { auth, db } from "../../firebase";

import { InputContainer, ButtonContainer, ErrorText } from "./Elements";

const AddNewContact = ({ isModalActive, onModalClose, chatsSnapshot }) => {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);

  const onEmailIdChangeHandler = (event) => {
    const inputValue = event.target.value;
    setError("");
    setEmailId(inputValue);
  };

  const OnSubmitEmail = () => {
    if (!emailId) return null;

    if (
      EmailValidator.validate(emailId) &&
      !chatAlreadyExists(emailId) &&
      emailId !== user?.email
    ) {
      // need to add the chat into DB 'chats' collection if it doesnot already exist and is valid
      db.collection("chats").add({
        users: [user?.email, emailId],
      });
      onModalClose();
    } else {
      setError("Email Already Exists !!!");
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    // here recipient mail is the mail with whom we want to create chat with
    // check if recipient mail is already present or not
    // !! to make the value undefined, null , '' to false
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Modal open={isModalActive} onClose={onModalClose}>
      <h2>Enter an email address for the user you wish to chat with</h2>
      <Divider />
      {error && <ErrorText>{error}</ErrorText>}
      <InputContainer>
        <TextField
          value={emailId}
          autoFocus
          onChange={onEmailIdChangeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </InputContainer>
      <ButtonContainer>
        <Button variant="outlined" color="secondary" onClick={onModalClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!emailId || error}
          onClick={OnSubmitEmail}
        >
          Add
        </Button>
      </ButtonContainer>
      {/* <input
    type="text"
    placeholder="Enter EmailId"

    /> */}
    </Modal>
  );
};

export default AddNewContact;
