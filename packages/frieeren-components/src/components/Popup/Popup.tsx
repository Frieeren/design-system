"use client";

import { Dialog } from "radix-ui";
import cx from "classnames";
import { LogPopupProps, PopupProps } from "./Popup.type";
import { useLog } from "../Log/LogProvider";
import { createLogId } from "../Log/createLogId";
import { useEffect } from "react";

export const Popup = (props: PopupProps) => {
  const {
    className,
    children,
    buttonLayoutType,
    container,
    title,
    description,
    onClose,
    open = true,
    ...rest
  } = props;

  return (
    <Dialog.Root {...rest} open={open}>
      <Dialog.Portal container={container || document.body}>
        <Dialog.Overlay className="popup--overlay" onClick={onClose} />
        <Dialog.Content
          data-frieeren-component="Popup"
          className={cx(
            "popup",
            {
              [`popup--layout-${buttonLayoutType}`]: buttonLayoutType
            },
            className
          )}
        >
          <Dialog.Title className="visually-hidden">{title || "Popup"}</Dialog.Title>
          <Dialog.Description className="visually-hidden">
            {description || "Popup"}
          </Dialog.Description>
          <div className="popup--body">{children}</div>
          {buttonLayoutType === "typeA" && "button" in props && props.button && (
            <div className="popup--actions">{props.button}</div>
          )}
          {buttonLayoutType === "typeB" && "leftButton" in props && "rightButton" in props && (
            <div className="popup--actions popup--actions-typeB">
              <div className="popup--actions-left">{props.leftButton}</div>
              <div className="popup--actions-right">{props.rightButton}</div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Popup.displayName = "Popup";

const LogPopup = ({ children, logParams, title, open, ...props }: LogPopupProps) => {
  const context = useLog();

  useEffect(() => {
    if (open) {
      const logId = createLogId({ logType: "event", eventType: "popup" });
      context.logClient?.popup({
        logId,
        params: {
          type: "popup",
          message: title ?? "",
          ...logParams
        }
      });
    }
  }, [context, logParams, title, open]);

  return <Popup title={title} open={open} {...props} />;
};

LogPopup.displayName = "LogPopup";

export { LogPopup };
