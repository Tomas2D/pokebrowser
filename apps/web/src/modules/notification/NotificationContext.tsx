import { createContext, ReactNode, useCallback, useState } from "react";
import { nop } from "rambda";
import {
  INotification,
  NotificationId,
  NotificationState,
} from "@module/notification/types";
import { guidGenerator } from "@module/notification/utils";

interface INotificationContext {
  notifications: INotification[];
  addNotification: (
    notification: Omit<INotification, "id" | "state">
  ) => NotificationId;
  removeNotification: (id: NotificationId) => void;
}

export const defaultNotificationContext: INotificationContext = {
  notifications: [] as INotification[],
  addNotification: () => "",
  removeNotification: nop,
} as const;

export const NotificationContext = createContext<INotificationContext>(
  defaultNotificationContext
);

interface NotificationContextProviderProps {
  children: ReactNode;
}

export function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [notifications, setNotifications] = useState<
    INotificationContext["notifications"]
  >(defaultNotificationContext.notifications);

  const addNotification: INotificationContext["addNotification"] = useCallback(
    (notification) => {
      const id = guidGenerator();
      setNotifications((notifications) => {
        return notifications.concat({
          ...notification,
          id,
          state: NotificationState.ACTIVE,
        });
      });
      return id;
    },
    []
  );

  const removeNotification: INotificationContext["removeNotification"] =
    useCallback((id) => {
      setNotifications((notifications) => {
        return notifications.filter((notification) => notification.id !== id);
      });
    }, []);

  return (
    <NotificationContext.Provider
      value={{
        ...defaultNotificationContext,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
