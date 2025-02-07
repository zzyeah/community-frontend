import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import React, { forwardRef } from "react";

const ZyEditor = forwardRef(
  (props: EditorProps, ref: React.MutableRefObject<Editor>) => {
    return (
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        language="zh-CN"
        {...props}
        ref={ref}
      />
    );
  }
);

export default ZyEditor;
