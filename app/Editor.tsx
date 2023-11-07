"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorState } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { AutoFocusPlugin } from "./AutoFocusPlugin";
import { OnChangePlugin } from "./OnChangePlugin";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { nodes } from "./nodes";
import { theme } from "./theme";
import { MarkdownPlugin, TRANSFORMERS } from "./MarkdownPlugin";

export function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError: (error: Error) => {
      console.log(error);
    },
    nodes: [...nodes],
    theme: theme,
  };

  const onChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    // DBに保存処理。今回はコンソールに出力するだけ
    // console.log(JSON.stringify(editorStateJSON));
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="px-2 py-1 border-2 border-blue-200" />
        }
        placeholder={
          <div className="absolute top-12 left-2 text-gray-500">
            プレースホルダー
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={onChange} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <MarkdownPlugin />
    </LexicalComposer>
  );
}
