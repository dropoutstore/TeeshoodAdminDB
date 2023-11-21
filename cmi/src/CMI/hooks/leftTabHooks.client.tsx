import{ useState } from 'react'

export type leftTabType = "product" | "text" | "image" | "QR" | "layers" |"hire" | "help" | "edit" | null
export interface CMILeftTabType {
  openedTab: leftTabType;
  setOpenedTab: React.Dispatch<React.SetStateAction<leftTabType>>;
}
export function useLeftTabHooks():CMILeftTabType {
    const [openedTab, setOpenedTab] = useState<leftTabType>("product")
  return {openedTab,setOpenedTab}
}
