export type MenuItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  children?: {
    name: string;
    path: string;
    icon?: React.ReactNode;
  }[];
};
