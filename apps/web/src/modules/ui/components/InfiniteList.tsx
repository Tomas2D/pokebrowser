import { ComponentProps, FC, ReactNode } from "react";
import styled from "styled-components";
import { nop } from "rambda";

import InfiniteScroll from "react-infinite-scroller";

interface InfiniteListProps extends ComponentProps<typeof StyledWrapper> {
  inProgress?: boolean;
  hasMore?: boolean;
  initialPage?: number;
  loadMore?: () => void;
  children: ReactNode;
  useWindow?: boolean;
}

export const InfiniteList: FC<InfiniteListProps> = ({
  children,
  initialPage = 0,
  loadMore = nop,
  useWindow = false,
  hasMore = false,
  inProgress = false,
  ...props
}) => {
  return (
    <StyledWrapper {...props}>
      <InfiniteScroll
        pageStart={initialPage}
        initialLoad={true}
        loadMore={!hasMore || inProgress ? nop : loadMore}
        hasMore={hasMore}
        useWindow={useWindow}
      >
        {children}
      </InfiniteScroll>
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div`
  width: 100%;
  overflow: visible;
`;
