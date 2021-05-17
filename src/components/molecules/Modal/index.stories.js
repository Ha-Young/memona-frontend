import { storiesOf } from "@storybook/react";
import React from "react";

import Modal from ".";

storiesOf("Modal", module)
  .add("default", () => (
    <Modal onClose={() => {console.log("onClose");}} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add("with title", () => (
    <Modal onClose={() => {console.log("onClose");}} title="Hello" isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add("closeable", () => (
    <Modal onClose={() => {console.log("onClose");}} title="Hello" closeable isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ))
  .add("reverse", () => (
    <Modal onClose={() => {console.log("onClose");}} reverse isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Modal>
  ));
