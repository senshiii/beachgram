import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getBeachById } from "./beaches";

export async function getCampaigns() {
  try {
    const querySnap = await getDocs(collection(db, "campaign"));
    const campaigns = await Promise.all(
      querySnap.docs.map(async (doc) => {
        const { beachId } = doc.data();
        let beachData;
        try {
          beachData = await getBeachById(beachId);
        } catch (err) {
          console.log("Error fetching beach data", err.message);
        }
        return {
          id: doc.id,
          beachData,
          ...doc.data(),
        };
      })
    );
    console.log("Campaigns", campaigns);
    return campaigns;
  } catch (err) {
    console.log("[getCampaigns] error", err);
    throw new Error(err.message);
  }
}

export async function getCampaignsByBeachId(beachId) {
  try {
    const q = query(collection(db, "campaign"), where("beachId", "==", beachId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((campDoc) => ({
      id: campDoc.id,
      ...campDoc.data(),
    }));
  } catch (err) {
    console.log("Error fetching campaigns by beach id", err.message);
    throw new Error(err.message);
  }
}