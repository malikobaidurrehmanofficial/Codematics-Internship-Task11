import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

const getWatchlistRef = (uid) => doc(db, 'watchlists', uid);

export const getUserWatchlist = async (uid) => {
  const snap = await getDoc(getWatchlistRef(uid));
  if (snap.exists()) {
    return snap.data().movies || [];
  }
  return [];
};

export const addMovieToWatchlist = async (uid, movieId) => {
  const ref = getWatchlistRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { movies: arrayUnion(movieId) });
  } else {
    await setDoc(ref, { movies: [movieId] });
  }
};

export const removeMovieFromWatchlist = async (uid, movieId) => {
  const ref = getWatchlistRef(uid);
  await updateDoc(ref, { movies: arrayRemove(movieId) });
};

export const subscribeToWatchlist = (uid, callback) => {
  return onSnapshot(getWatchlistRef(uid), (snap) => {
    if (snap.exists()) {
      callback(snap.data().movies || []);
    } else {
      callback([]);
    }
  });
};
