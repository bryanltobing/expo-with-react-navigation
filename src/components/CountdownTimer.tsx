import React from "react";

import { TimerResult, TimerSettings, useTimer } from "react-timer-hook";

type CountdownTimerProps = {
  children?: (props: TimerResult) => JSX.Element;
} & TimerSettings;

export function CountdownTimer({ children, ...props }: CountdownTimerProps) {
  const timer = useTimer(props);
  return <>{children?.(timer)}</>;
}
