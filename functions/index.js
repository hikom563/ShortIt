const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.linkCreated = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onCreate((snapShot, context) => {
    const { userUid, linkID } = context.params;
    const { longURL, shortCode } = snapShot.data();

    return admin.firestore().doc(`links/${shortCode}`).set({
      userUid,
      linkID,
      longURL,
    });
  });

exports.linkDeleted = functions.firestore
  .document("users/{userUid}/links/{linkID}")
  .onDelete((snapShot, context) => {
    const { shortCode } = snapShot.data();

    return admin.firestore().doc(`links/${shortCode}`).delete();
  });
