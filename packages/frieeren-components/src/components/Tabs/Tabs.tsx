import { useRef } from "react";
import * as TabsBase from "@radix-ui/react-tabs";
import { TabsProps } from "./Tabs.type";
import { useTabsIndicator } from "./useTabsIndicator";

export const Tabs = (props: TabsProps) => {
  const { width = "100%", tabItems, value, ...rest } = props;
  const listRef = useRef<HTMLDivElement>(null);
  const { indicatorStyle } = useTabsIndicator({ listRef });

  return (
    <TabsBase.Root
      data-frieeren-component="Tabs"
      className="tabs"
      value={value}
      {...rest}
      style={{ width }}
    >
      <TabsBase.List ref={listRef} data-orientation="horizontal" className="tabs--list">
        {tabItems.map(item => (
          <TabsBase.Trigger
            key={`tabTrigger_${item.value}`}
            value={item.value}
            className="tabs--trigger"
          >
            {item.label}
          </TabsBase.Trigger>
        ))}
      </TabsBase.List>
    </TabsBase.Root>
  );
};
