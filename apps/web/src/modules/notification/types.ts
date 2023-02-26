import { ReactNode } from "react";
import { NotificationKind } from "carbon-components-react";

export type NotificationId = string;

export enum NotificationState {
  ACTIVE,
  DELETING,
}

export interface INotification {
  id: NotificationId;
  state: NotificationState;
  title: NonNullable<ReactNode>;
  subtitle?: ReactNode;
  type?: NotificationKind;
}
