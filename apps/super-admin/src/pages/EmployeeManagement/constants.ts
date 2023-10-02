import { db } from "@admin/configs";
import { collection } from "firebase/firestore";

export const staffCollection = collection(db, 'employees')