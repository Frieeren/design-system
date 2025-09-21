import * as TabsBase from "@radix-ui/react-tabs";
import { ReactNode, RefObject } from "react";

interface TabItem {
  value: string;
  label: ReactNode;
}

export interface UseTabsIndicatorProps {
  listRef: RefObject<HTMLDivElement>;
}

export interface TabsProps extends Omit<TabsBase.TabsProps, "children" | "dir"> {
  width?: string;
  tabItems: TabItem[];
}
