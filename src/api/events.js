import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getEventsByBeachId(beachId) {
  try {
    console.log("[getEventsByBeachId] beachId", beachId);
    const q = query(collection(db, "events"), where("beachId", "==", beachId));
    const querySnap = await getDocs(q);
    console.log(querySnap.empty, querySnap.size);
    const data = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("events", data);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchAllEvents() {
  try {
    const q = query(
      collection(db, "events"),
      where("eventDate", ">=", Date.now())
    );
    const snap = await getDocs(collection(db, "events"));
    const events = await Promise.all(
      snap.docs.map(async (eventDoc) => {
        console.log("Event Doc Data", eventDoc.data());
        const { beachId } = eventDoc.data();
        console.log("beach id", beachId);
        const beachRef = doc(db, `beaches/${beachId}`);
        console.log("beach ref path", beachRef.path);
        const beachSnap = await getDoc(beachRef);
        const beachData = beachSnap.data();
        console.log("beach data", beachData);
        console.log("\n\n")
        return {
          id: eventDoc.id,
          beachDetails: {
            name: beachData?.name,
            address: beachData?.address,
          },
          ...eventDoc.data(),
        };
      })
    );
    console.log(events);
    return events;
  } catch (err) {}
}
