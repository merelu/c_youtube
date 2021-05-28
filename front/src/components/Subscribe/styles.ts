import styled from "@emotion/styled";

export const SubscribeButton = styled.button<{ subscribed?: boolean }>`
  background-color: ${(props) => (props.subscribed ? "#AAAAAA" : "#CC0000")};
  border-radius: 4px;
  border-color: white;
  color: white;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 1rem;
  text-transform: uppercase;
`;
