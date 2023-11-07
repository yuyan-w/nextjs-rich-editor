import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

type OnChangeProps = {
  onChange: (state: EditorState) => void;
};

export function OnChangePlugin({ onChange }: OnChangeProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    // editor.registerUpdateListenerにコールバック関数を登録することで、
    // Lexicalエディタへの変更がコミットされた時に実行される処理を登録します。
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}
