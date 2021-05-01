// purpose - taking an array and the user logged in and return the user name
const getRecipientEmail = (users, userLoggedIn) => (
  users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]
);

export default getRecipientEmail;
