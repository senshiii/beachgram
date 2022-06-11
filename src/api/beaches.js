import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getCampaignsByBeachId } from './campaigns'
import { getEventsByBeachId } from './events'

export async function getBeachById(beachId) {
  try {
    const beachRef = doc(db, "beaches", beachId);
    const beachSnap = await getDoc(beachRef);
    if (!beachSnap.exists())
      throw new Error(`Beach with id = ${beachId} not found`);
    return {
      id: beachId,
      ...beachSnap.data(),
    };
  } catch (err) {
    console.log("[getBeachById] error", err.message);
    throw new Error(err.message);
  }
}

export async function getBeachProfile(beachId) {
  try {
    const beachRef = doc(db, "beaches", beachId);
    const beachSnap = await getDoc(beachRef);
    if (!beachSnap.exists())
      throw new Error(`Beach with id = ${beachId} not found`);
    const campaigns = await getCampaignsByBeachId(beachId);
    const events = await getEventsByBeachId(beachId);
    const beachProfile = {
      id: beachId,
      campaigns,
      events,
      ...beachSnap.data(),
    };
    console.log('Beach Profile', beachProfile);
    return beachProfile;
  } catch (err) {
    console.log("[getBeachById] error", err.message);
    throw new Error(err.message);
  }
}
