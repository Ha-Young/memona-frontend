import { styled } from "@storybook/theming";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { css } from "styled-components";
import { font, palette } from "styled-theme";

import Heading from "../../atoms/Heading";
import IconButton from "../IconButton";

const overlayStyles = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*="after-open"] {
    opacity: 1;
  }
  &[class*="before-close"] {
    opacity: 0;
  }
`;

const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: ${font("primary")};
  font-size: 1rem;
  background-color: ${palette("grayscale", 0, true)};
  border-radius: 0.125em;
  color: ${palette("grayscale", 0)};
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% + 1rem) 1rem 1rem;
  transform: translate(-50%, 100%);
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  min-width: 320px;
  max-width: calc(640px - 1rem);
  max-height: calc(100% - 1rem);

  &[class*="after-open"] {
    transform: translate(-50%, -50%);
  }
  &[class*="before-close"] {
    transform: translate(-50%, 100%);
  }
  @media screen and (max-width: 640px) {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 640px) {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
    height: 40px;
  }
`;

const StyledHeading = styled(Heading)`
  margin: 0 1rem !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media screen and (max-width: 640px) {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const StyledIconButton = styled(IconButton)`
  background-color: transparent;
`;

const OpacityIconButton = styled(IconButton)`
  opacity: 0;
`;

const Content = styled.div`
  overflow: auto;

  @media screen and (max-width: 640px) {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
  }
`;

const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  ${overlayStyles}
`;

ReactModal.setAppElement("#root");

const Modal = ({ children, title, closeable, onClose, ...props }) => {
  const { reverse } = props;
  const hasHeader = title || closeable;
  return (
    <StyledReactModal
      contentLabel={title || "Modal"}
      onRequestClose={onClose}
      hasHeader={hasHeader}
      {...props}
    >
      {hasHeader && (
        <Header>
          {closeable && (
            <StyledIconButton
              icon="close"
              onClick={onClose}
              palette="white"
              height={24}
              reverse
            />
          )}
          <StyledHeading level={2} reverse={reverse}>
            {title}
          </StyledHeading>
          <OpacityIconButton height={24}/>
        </Header>
      )}
      <Content>{children}</Content>
    </StyledReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  closeable: PropTypes.bool,
  reverse: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
