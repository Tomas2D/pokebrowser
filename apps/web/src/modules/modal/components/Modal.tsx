import { Portal } from "@app/components/Portal";
import { MODAL_WRAPPER_ID } from "@app/config";
import { Modal as CarbonModal, ModalProps } from "carbon-components-react";
import styled from "styled-components";

type ModalWrapperProps = ModalProps;

export function Modal(props: ModalWrapperProps) {
  return (
    <Portal targetId={MODAL_WRAPPER_ID}>
      <StyledWrapper>
        <CarbonModal {...props} />
      </StyledWrapper>
    </Portal>
  );
}

const StyledWrapper = styled.div`
  .cds--modal-container {
    width: 65%;
  }
`;
