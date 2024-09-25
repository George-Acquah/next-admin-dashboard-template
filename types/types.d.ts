interface _ISidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  // setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface _IModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface _ISidebarProviderProps extends Partial<_ISidebarContextProps>{
  children: React.ReactNode;
}

interface _ILinks {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface _IEntityData {
  count: number;
  type: string;
}

interface _ITableProps {
  header: string;
  accessor: string;
  className?: string;
}
interface _ITableHeaderRowContents {
  columns: _ITableProps[];
  renderRow: (items: any) => React.ReactNode;
  data: any[];
}

interface _ITooltipItem {
  id: number;
  name: string;
  designation?: string;
  image?: string;
  icon?: any;
  theme: string;
}

interface _IChildren {
  children: React.ReactNode;
}

interface _INotification {
  id: number;
  subject: string;
  message: string;
}

interface _ISearchParams {
  SESSION: string;
  ERROR: string;
  ERR_MSG: string;
  ERR_DESC: string;
  BTN_LABEL: string;
  ENTITY_TYPE: string;
  QUERY: string;
  FORM_STEP: string;
}

interface _ISearchQuery {
  searchParams?: {
    q?: string;
    page?: string;
    size?: string;
  };
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