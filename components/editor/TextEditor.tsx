import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ControllerRenderProps } from "react-hook-form";

type TextEditorProps = {
  field: ControllerRenderProps;
};

const TextEditor = ({ field }: TextEditorProps) => {
  const editorRef = useRef(null);
  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
        onInit={(_evt, editor) =>
          // @ts-expect-error: Suppress type error for setting editorRef.current
          (editorRef.current = editor)
        }
        onBlur={field.onBlur}
        onEditorChange={(content) => field.onChange(content)}
        initialValue=""
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            "undo redo | blocks | " +
            "codesample bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Inter; font-size:16px }",
        }}
      />
    </>
  );
};
export default TextEditor;
