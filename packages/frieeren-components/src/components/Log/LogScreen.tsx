import { PropsWithChildren, useEffect } from "react";
import { useLog } from "./LogProvider";
import { createLogId } from "./createLogId";

type LogScreenProps = PropsWithChildren<{
  logParams: Record<string, string>;
}>;

export function LogScreen({ children, logParams }: LogScreenProps) {
  const context = useLog();

  useEffect(() => {
    context.setLogParams?.(logParams);
  }, [logParams, context]);

  useEffect(() => {
    const logId = createLogId({ logType: "screen" });
    context.logClient?.screen({
      logId,
      params: {
        title: logParams["title"] ?? "",
        ...logParams
      }
    });
  }, [context, logParams]);

  return children;
}
