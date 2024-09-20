interface _ISidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface _ISidebarProviderProps extends Partial<_ISidebarContextProps>{
  children: React.ReactNode;
}

interface _ILinks {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface _IChildren {
  children: React.ReactNode;
}


type _TVariants =
  | "default"
  | "secondary"
  | "destructive"
  | "outline";

type _TSizes =
  | "default"
  | "lg"
  | "sm"
  | "icon";

  type _TRefDivElement = React.HTMLAttributes<HTMLDivElement>;
  type _TRefPElement = React.HTMLAttributes<HTMLParagraphElement>;