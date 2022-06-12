import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getCampaignById } from "./campaigns";
import { getEventById } from "./events";

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

export async function getMyRsvps(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    const { eventRsvps, campaignRsvps } = docSnap.data();
    const events = await Promise.all(
      eventRsvps.map(async (eventId) => {
        const event = await getEventById(eventId);
        return { id: eventId, ...event };
      })
    );
    const campaigns = await Promise.all(
      campaignRsvps.map(async (campId) => {
        const camp = await getCampaignById(campId);
        return { id: campId, ...camp };
      })
    );
    // console.log("[getMyRsvps] events", events, "camps", campaigns);
    return {
      events,
      campaigns,
    };
  } catch (err) {
    // console.log("Error fetching my rsvps", err.message);
    throw new Error(err.message);
  }
}

export async function likeEvent(eventId, userId) {
  try {
    // console.log("[rsvpEvent] eventId", eventId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { likedEvents: arrayUnion(eventId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function unlikeEvent(eventId, userId) {
  try {
    // console.log("[rsvpEvent] eventId", eventId, "userId", userId);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { likedEvents: arrayRemove(eventId) });
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getMyLikedEvents(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    const { likedEvents } = docSnap.data();
    const events = await Promise.all(
      likedEvents.map(async (eventId) => {
        const event = await getEventById(eventId);
        return { id: eventId, ...event };
      })
    );
    // console.log("[getMyLikedEvents] events", events);
    return events;
  } catch (err) {
    // console.log("Error fetching my liked events", err.message);
    throw new Error(err.message);
  }
}
