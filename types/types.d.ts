interface _ISidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
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

interface _IDetail {
  id: string;
  placeholder?: string;

  /**
   * The value to be shown inside the input field.
   *
   * @type {string}
   * @memberof Detail
   */
  value?: string;

  /**
   * The label to be displayed alongside the input field.
   * This provides a description or name for the field.
   *
   * @type {string}
   * @memberof Detail
   */
  label: string;
  width?: string;
  bg?: string;
  input_type?: "select" | "radio" | "textarea";
  /**
   * Optional icon to be displayed within the input field.
   * Can be used to visually represent the field's purpose.
   *
   * @type {any}
   * @memberof Detail
   */
  icon?: string;

  onChange?: any;

  /**
   * Optional options to be rendered for select input field.
   *
   * @type {any}
   * @memberof Detail
   */
  options?: string[];

  /**
   * Optional radios to be rendered for radio input field.
   *
   * @type {any}
   * @memberof Detail
   */
  radio?: _IRadio[];

  /**
   * The type of the input field (e.g., "text", "password").
   * Defines the kind of data the input field expects.
   *
   * @type {string}
   * @memberof Detail
   */
  type: string;
  disabled?: boolean;
  mt?: boolean;
  tooltip?: boolean;
  group?: string; //
  errors?: Record<string, string[] | undefined> | null;
}

interface _IPostApiResponse {
  statusCode: number;
  message: string;
}

interface _IApiResponse<T> extends _IPostApiResponse {
  data: T;
}

interface _ITableHeaderRowContents {
  columns: _ITableProps[];
  renderRow: (items: any) => React.ReactNode;
  data: any[];
}

interface _IVerificationBtn {
  id: string;
  status: boolean;
}

interface _ICommonFieldProps {
  name: string;
  label: string;
  type: _TFieldType;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  renderAfter?: ReactNode;
}

interface _IActionBtn {
  id: string;
  label: string;
  action: (id: string, path: string) => Promise<_IApiResponse<void> | undefined | void>;
  path?: string;
}

interface _ITableSignature {
  [key: string]: string | string[] | number | boolean | null | undefined; // Flexible for other dynamic fields
}
interface _TableRowType extends _ITableSignature{
  _id: string; // Explicitly required
  image?: string; // Required for rendering the image
  description?: string;
}

interface _ITableProps<T = _TableRowType[]> {
  query?: string;
  currentPage?: number;
  columnData: string[];
  entityType: string;
  deleteAction: (id: string, path: string) => Promise<_IApiResponse<void> | undefined| void>;
  data?: T;
  type?: string;
}

interface _ISpecificTableProps {
  query: string;
  currentPage: number;
  pageSize: number;
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
type _TFieldType = "text" | "email" | "password" | "number";

  type _TRefDivElement = React.HTMLAttributes<HTMLDivElement>;
type _TRefPElement = React.HTMLAttributes<HTMLParagraphElement>;
  