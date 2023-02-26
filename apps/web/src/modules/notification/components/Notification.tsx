import { INotification, NotificationState } from "@module/notification/types";
import { ToastNotification } from "carbon-components-react";
import styled from "styled-components";

interface NotificationProps {
  data: INotification;
  onClose: () => void;
}

export function Notification({ data, onClose }: NotificationProps) {
  return (
    <StyledToastNotification
      title={data.title}
      subtitle={data.subtitle || "\u00A0"}
      kind={data.type || "info"}
      role={"status"}
      hideCloseButton={data.state !== NotificationState.ACTIVE}
      onClose={() => {
        onClose();

        // prevent unmount by returning "false"
        return false;
      }}
    />
  );
}

const StyledToastNotification = styled(ToastNotification)`
  background: ${({ theme }) => theme.colors.notificationBg};
  color: ${({ theme }) => theme.colors.text};
  max-width: 20rem;

  .cds--toast-notification__close-button .cds--toast-notification__close-icon {
    fill: ${({ theme }) => theme.colors.text};
  }

  .cds--toast-notification__title {
    color: ${({ theme }) => theme.colors.title};
  }

  .cds--toast-notification__subtitle {
    color: ${({ theme }) => theme.colors.text};
  }
`;
