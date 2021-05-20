import * as admin from "firebase-admin";

//
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DATABASE_URL,
  });
}



export { admin };
