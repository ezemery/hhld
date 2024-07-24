import { Context, createContext, Dispatch, SetStateAction } from "react";

 interface ContextType {
  user: {[key:string]:string} | null, 
  setUser: Dispatch<SetStateAction<null>>
}

const defaultValue: ContextType = {
  user: null,
  setUser: () => {},
};

export const DataContext: Context<ContextType> =
  createContext<ContextType>(defaultValue);
  