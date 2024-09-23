import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<_ISidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined || !context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp, animate}: _ISidebarProviderProps ) => {
  const [openState, setOpenState] = useState(false);
  // const [animateState, setAnimateState] = useState(true);
    const open = openProp !== undefined ? openProp : openState;
    // const animate = animateProp !== undefined ? animateProp : animateState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;
    // const setAnimate =
    //   setAnimateProp !== undefined ? setAnimateProp : setAnimateState;
    
    return (
      <SidebarContext.Provider value={{ open, setOpen, animate: animate!, }}>
      {children}
      </SidebarContext.Provider>
    );
}

export default SidebarProvider;