import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getBeachById } from "./beaches";

export async function getEventsByBeachId(beachId) {
  try {
    // console.log("[getEventsByBeachId] beachId", beachId);
    const q = query(collection(db, "events"), where("beachId", "==", beachId));
    const querySnap = await getDocs(q);
    // console.log(querySnap.empty, querySnap.size);
    const data = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // console.log("events", data);
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
        const { beachId } = eventDoc.data();
        let beachData;
        try {
          beachData = await getBeachById(beachId);
        } catch (err) {
          console.log("Error fetching beach data", err.message);
        }

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
