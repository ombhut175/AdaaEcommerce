const {signInWithPhoneNumber,recaptchaVerifier} = require("firebase/auth")

const phoneNumber = "+917043333359";
// const appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      // window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
      
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });