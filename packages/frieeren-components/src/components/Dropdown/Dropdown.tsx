"use client";

import { useState } from "react";
import cx from "classnames";
import { DropdownMenu } from "radix-ui";
import { Arrow1Icon } from "@team-frieeren/icons";
import { DropdownProps } from "./Dropdown.type";
import "./Dropdown.scss";

export const Dropdown = ({ label, items, onOpenChange, onClick }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string } | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const handleClick = (value: { label: string; value: string }) => {
    setSelectedItem(value);
    onClick?.(value);
  };

  const displayLabel = selectedItem?.label || label;

  return (
    <DropdownMenu.Root data-frieeren-component="Dropdown" onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild className="DropdownMenuTrigger">
        <div
          className="DropdownMenuTriggerContent"
          style={{ borderRadius: isOpen ? "4px 4px 0 0" : "4px" }}
        >
          <div className="DropdownMenuTriggerContentText">{displayLabel}</div>
          <Arrow1Icon
            size={20}
            style={{
              transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
              transition: "transform 0.2s ease-in-out"
            }}
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={-1}>
          {items.map(item => (
            <DropdownMenu.Item
              className={cx("DropdownMenuItem", {
                "DropdownMenuItem--selected": selectedItem?.value === item.value
              })}
              key={item.value}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
