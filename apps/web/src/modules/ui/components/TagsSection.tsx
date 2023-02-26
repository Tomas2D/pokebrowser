import { Tag, TagTypeName } from "carbon-components-react";
import { ButtonComponents } from "@module/ui/components/Button";
import { ReactNode } from "react";
import styled from "styled-components";
import { Tooltip } from "@app/modules/ui/components/Tooltip";

interface TagsSectionProps<T> {
  title?: ReactNode;
  tooltipLabel: (item: T) => string;
  data: Array<T> | ReadonlyArray<T>;
  tagType: TagTypeName;
}

export const TagsSection = <T extends { id: number | string; name: string }>({
  title,
  data,
  tagType,
  tooltipLabel,
}: TagsSectionProps<T>) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      {title && <StyledSubSectionTitle>{title}</StyledSubSectionTitle>}
      <div>
        {data.map((item) => (
          <Tooltip key={item.id} {...{ label: tooltipLabel(item) }}>
            <StyledButton className="sb-tooltip-trigger" type="button">
              <StyledTag type={tagType} size="md">
                {item.name}
              </StyledTag>
            </StyledButton>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const StyledButton = styled(ButtonComponents.empty)`
  padding-left: 0;
`;

export const StyledSubSectionTitle = styled.h3`
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const StyledTag = styled(Tag)`
  width: auto;
  margin: 0;
`;
