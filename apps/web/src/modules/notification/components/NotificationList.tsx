import { useContext } from "react";
import { NotificationContext } from "@module/notification/NotificationContext";
import styled from "styled-components";
import { Notification } from "@module/notification/components/Notification";
import { animated, config, useTransition } from "@react-spring/web";

export function NotificationList() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  const listTransitions = useTransition(notifications, {
    config: config.gentle,
    from: {
      opacity: 0,
      transform: "translate3d(0%, 100%, 0px)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0%, 0%, 0px)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0%, -100%, 0px)",
    },
    keys: (item) => item.id,
  });

  return (
    <StyledWrapper>
      {listTransitions((styles, item, _, index) => (
        <animated.div
          key={item.id}
          style={{
            ...styles,
            overflow: "hidden",
            zIndex: notifications.length - index,
          }}
        >
          <Notification
            data={item}
            onClose={() => removeNotification(item.id)}
          />
        </animated.div>
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 12;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
