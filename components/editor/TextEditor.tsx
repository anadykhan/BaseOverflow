import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ControllerRenderProps, Path } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { useTheme } from "@/context/ThemeProvider";
import { AnswersSchema } from "@/lib/validations";

type TextEditorProps<T extends ZodSchema, K extends Path<z.infer<T>>> = {
  field: ControllerRenderProps<z.infer<T>, K>;
  schema: T;
  initialValue: string;
};

const TextEditor = <T extends ZodSchema, K extends Path<z.infer<T>>>({
  field,
  schema,
  initialValue
}: TextEditorProps<T, K>) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();

  if (
    schema instanceof z.ZodObject &&
    schema.shape === AnswersSchema.shape
  ) {
    try {
      if (editorRef.current) {
        console.log("Editor ref in answer: ", editorRef)
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  console.log(mode);
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
        initialValue={initialValue === "" ? "" : JSON.parse(initialValue)}
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
export default TextEditor;
