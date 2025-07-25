"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { LogType } from "./Log.type";
import { useIsMounted } from "@/hooks/useIsMounted";

type LogClient = {
  log: (event: LogType, data?: { logId: string; params?: Record<string, string> }) => void;
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
    throw new Error("LogProvider 내부에서 사용할 수 있습니다");
  }

  return context;
}
