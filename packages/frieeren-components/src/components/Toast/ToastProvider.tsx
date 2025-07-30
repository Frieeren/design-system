import { Toaster } from "./Toast";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/useIsMounted";
import { createContext, ReactNode, useState, useCallback, useMemo, useEffect } from "react";
import { ToastContextValue, ToastOptions, ToastProviderProps, ToastType } from "./Toast.type";
import { useLog } from "../Log/LogProvider";
import { createLogId } from "../Log/createLogId";

const defaultToastValue: ToastOptions = {
  type: "default",
  action: "defualt",
  style: {},
  offest: 0,
  message: "",
  duration: 3000,
  position: "top-right"
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const ToastPortal = ({ children }: { children: ReactNode }) => {
  const isMounted = useIsMounted();
  const [portalNode, setPortalNode] = useState<Element | null>(null);

  useEffect(() => {
    let node = document.getElementById("toast-portal");

    if (!node) {
      node = document.createElement("div");
      node.id = "toast-portal";
      document.body.appendChild(node);
    }

    setPortalNode(node);
  }, []);

  if (!isMounted || !portalNode) return null;

  return createPortal(children, portalNode);
};

export const ToastProvider = ({ options, children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const context = useLog();

  const add = useCallback(
    (toast: Partial<ToastOptions>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastType = {
        ...toast,
        id,
        type: toast.type ?? options?.type ?? defaultToastValue.type,
        action: toast.action ?? options?.action ?? defaultToastValue.action,
        style: toast.style ?? options?.style ?? defaultToastValue.style,
        offest: toast.offest ?? options?.offest ?? defaultToastValue.offest,
        radius: toast.radius ?? options?.radius ?? defaultToastValue.radius,
        message: toast.message ?? options?.message ?? defaultToastValue.message,
        duration: toast.duration ?? options?.duration ?? defaultToastValue.duration,
        position: toast.position ?? options?.position ?? defaultToastValue.position,
        logParams: toast.logParams ?? options?.logParams
      };

      context.logClient?.popup({
        logId: createLogId({ logType: "event", eventType: "popup" }),
        params: {
          type: "toast",
          message: newToast.message,
          ...context.logParams,
          ...newToast.logParams
        }
      });

      setToasts(prev => [newToast, ...prev]);

      if (newToast.duration > 0) {
        setTimeout(() => remove(id), newToast.duration);
      }

      return id;
    },
    [options]
  );

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      add,
      remove
    }),
    [add, remove]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastPortal>{toasts.length && <Toaster toasts={toasts} />}</ToastPortal>
    </ToastContext.Provider>
  );
};
