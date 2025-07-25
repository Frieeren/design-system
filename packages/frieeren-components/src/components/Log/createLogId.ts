import { LogType, EventType } from "./Log.type";

export function createLogId({ logType, eventType }: { logType: LogType; eventType?: EventType }) {
  const routerPath = window.location.pathname;
  const logId = `${routerPath}${logType === "event" ? `::${eventType}` : ""}`;
  return logId;
}
