import { PropsWithChildren, useEffect } from "react";
import { useLog } from "./LogProvider";
import { createLogId } from "./createLogId";

type LogScreenProps = PropsWithChildren<{
  logParams: Record<string, string>;
}>;

export function LogScreen({ children, logParams }: LogScreenProps) {
  const { logClient, setLogParams } = useLog();

  useEffect(() => {
    setLogParams?.(logParams);
  }, [logParams, setLogParams]);

  useEffect(() => {
    const logId = createLogId({ logType: "screen" });
    logClient.log("screen", {
      logId,
      params: {
        ...logParams
      }
    });
  }, [logClient, logParams]);

  return children;
}
