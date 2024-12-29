import { Editor } from "@tinymce/tinymce-react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { useTheme } from "@/context/ThemeProvider";

type AnswerEditorProps<T extends ZodSchema, K extends Path<z.infer<T>>> = {
  field: ControllerRenderProps<z.infer<T>, K>;
  editorRef: React.Ref<any>
};

const AnswerEditor = <T extends ZodSchema, K extends Path<z.infer<T>>>({
  field,
  editorRef,
}: AnswerEditorProps<T, K>) => {
  const { mode } = useTheme();

  return (
    <>
      <Editor
        key={mode}
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
          skin: mode === "dark" ? "oxide-dark" : "oxide",
          content_css: mode === "dark" ? "dark" : "light",
        }}
      />
    </>
  );
};
export default AnswerEditor;
