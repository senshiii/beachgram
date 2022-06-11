import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function rsvpEvent(eventId, userId) {
  try {
    // console.log("[rsvpEvent] eventId", eventId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { eventRsvps: arrayUnion(eventId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function unRvspEvent(eventId, userId) {
  try {
    // console.log("[unRvspEvent] eventId", eventId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { eventRsvps: arrayRemove(eventId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function rsvpCampaign(campaignId, userId) {
  try {
    // console.log("[rsvpCampaign] campId", campaignId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { campaignRsvps: arrayUnion(campaignId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function unRsvpCampaign(campaignId, userId) {
  try {
    // console.log("[unRsvpCampaign] campId", campaignId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { campaignRsvps: arrayRemove(campaignId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}
