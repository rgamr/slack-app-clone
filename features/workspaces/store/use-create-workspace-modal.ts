import { atom , useAtom} from "jotai";
// import { create } from "zustand";


interface CreateWorkspaceModalState {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

const modalState =atom(false);

export const useCreateWorkspaceModal = () =>{
  return useAtom(modalState)
}