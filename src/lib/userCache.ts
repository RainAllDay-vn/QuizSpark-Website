import { type User } from "firebase/auth";

// Extended user type that includes userId and other info from our backend
export interface ExtendedUser extends User {
  username: string;
  userId: string;
  role: 'ROLE_ADMIN' | 'ROLE_STUDENT' | 'ROLE_TEACHER';
}

interface CacheState {
  userData: ExtendedUser | null;
  isDirty: boolean;
}

let cache: CacheState = {
  userData: null,
  isDirty: true  // Start dirty to force initial fetch
};

export const userCache = {
  get: () => cache.userData,
  isDirty: () => cache.isDirty,
  set: (user: ExtendedUser) => {
    cache.userData = user;
    cache.isDirty = false;
  },
  markDirty: () => {
    cache.isDirty = true;
  },
  clear: () => {
    cache.userData = null;
    cache.isDirty = true;
  }
};