type LogType = "event" | "screen";
type EventType = "click" | "popup" | "custom";

export function createLogId({ logType, eventType }: { logType: LogType; eventType?: EventType }) {
  const routerPath = typeof window !== "undefined" ? window.location.pathname : "";
  const logId = `${routerPath}${logType === "event" ? `::${eventType}` : ""}`;
  return logId;
}
