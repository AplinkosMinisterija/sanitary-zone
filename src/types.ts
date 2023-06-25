export type ProfileId = "freelancer" | "expert" | string;

export type Column = {
  label: string;
  mobileOrder?: number;
  desktopOrder?: number;
  show: boolean;
  visible?: boolean;
};

export type Columns = {
  [key: string]: Column;
};

export type FileProps = {
  url: string;
  name: string;
  size: number;
};

export type ResponseFileProps = {
  url: string;
  filename: string;
  size: number;
};

export interface ListResultProps<T> {
  rows?: T[];
  totalPages?: number;
  error?: string;
}

export type HandleChangeType = (name: string, value: any) => void;
export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

export interface DeleteInfoProps {
  deleteButtonText: string;
  deleteDescriptionFirstPart: string;
  deleteDescriptionSecondPart: string;
  deleteTitle: string;
  deleteName: string;
  deleteFunction?: () => void;
}

export interface UserFilters {
  firstName?: string;
  lastName?: string;
}
