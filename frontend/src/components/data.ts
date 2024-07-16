export type Password = {
  _id: string;
  userId: string;
  siteName: string;
  customName: string;
  username: string;
  password: string;
  url: string;
  sharedWith: string[];
  comments: string;
  lastCopy: Date; // Utilisation de `Date` au lieu de `string`
  createdAt: Date; // Utilisation de `Date` au lieu de `string`
  updatedAt: Date; // Utilisation de `Date` au lieu de `string`
  __v: number;
};

// Création de l'objet en parsant les dates
const passwordData: Password = {
  _id: "669587ff83efdfc2bdd9e783",
  userId: "669587d483efdfc2bdd9e77f",
  siteName: "testy",
  customName: "pro",
  username: "testy",
  password:
    "41d44e8bff38edc3ee693a91baa864f445f198f1c9694fee39a06df4a76fbf1caa210551869d7a94980aefe1371734fd",
  url: "http://testy.io",
  sharedWith: [],
  comments: "Testy password entry",
  lastCopy: new Date("2024-07-15T15:23:51.392Z"), // Conversion en objet Date
  createdAt: new Date("2024-07-15T15:19:51.392Z"), // Conversion en objet Date
  updatedAt: new Date("2024-07-15T15:21:51.392Z"), // Conversion en objet Date
  __v: 0,
};

export default passwordData;
