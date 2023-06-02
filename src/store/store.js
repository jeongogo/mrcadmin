import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let state = (set) => ({
  user: '',
  setUser: (data) => set(() => ({ user: data })),
});

state = persist(state, { name: 'mrcadmin', getStorage: () => localStorage });

const useStore = create(devtools(state));

export default useStore;