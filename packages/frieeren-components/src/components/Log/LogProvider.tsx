"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { LogClickParams, LogPopupParams, LogScreenParams } from "./Log.type";
import { createLogId } from "./createLogId";

export type LogClient = {
  screen({
    logId,
    params
  }: {
    logId: ReturnType<typeof createLogId>;
    params: LogScreenParams;
  }): void;
  click({ logId, params }: { logId: ReturnType<typeof createLogId>; params: LogClickParams }): void;
  popup({ logId, params }: { logId: ReturnType<typeof createLogId>; params: LogPopupParams }): void;
};

type LogProviderContext = {
  logClient: LogClient;
  logParams?: Record<string, string>;
  setLogParams?: (data: Record<string, string>) => void;
};

type LogProviderProps = PropsWithChildren<LogProviderContext>;

export const LogContext = createContext<LogProviderContext | null>(null);

export function LogProvider({ children, logClient, logParams }: LogProviderProps) {
  const [params, setParams] = useState({});

  const setLogParams = useCallback((data: Record<string, string>) => {
    setParams(data);
  }, []);

  return (
    <LogContext.Provider
      value={{
        logClient,
        logParams: { ...logParams, ...params },
        setLogParams
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

export function useLog() {
  const context = useContext(LogContext);

  if (!context) {
    if (process.env.NODE_ENV === "development") {
      console.warn("LogProvider 내부에서 사용할 수 있습니다");
    }
    return {
      logClient: {
        screen: () => {},
        click: () => {},
        popup: () => {}
      },
      setLogParams: () => {},
      logParams: {}
    };
  }

  return context;
}
