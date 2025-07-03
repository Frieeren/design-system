import * as TabsBase from "@radix-ui/react-tabs";
import "./Tabs.scss";

const Root = ({ ...props }: TabsBase.TabsProps) => {
  return <TabsBase.Root data-frieeren-component="Tabs" className="tabs" {...props} />;
};

const List = ({ ...props }: TabsBase.TabsListProps) => {
  return <TabsBase.List data-frieeren-component="TabsList" className="tabs--list" {...props} />;
};

const Trigger = ({ ...props }: TabsBase.TabsTriggerProps) => {
  return (
    <TabsBase.Trigger data-frieeren-component="TabsTrigger" className="tabs--trigger" {...props} />
  );
};

const Content = ({ ...props }: TabsBase.TabsContentProps) => {
  return (
    <TabsBase.Content data-frieeren-component="TabsContent" className="tabs--content" {...props} />
  );
};

export { Root, List, Trigger, Content };
