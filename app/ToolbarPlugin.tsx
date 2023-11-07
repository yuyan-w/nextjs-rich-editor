import { $getSelection, $isRangeSelection } from "lexical";
import {
  $createHeadingNode,
  HeadingTagType,
  $isHeadingNode,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

const SupportedBlockType = {
  paragraph: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
} as const;
type BlockType = keyof typeof SupportedBlockType;

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // editorStateからエディタの状態の読み取りを行う
      editorState.read(() => {
        // 現在の選択範囲を取得
        const selection = $getSelection();
        // 選択範囲が RangeSelection 出なければ何もしない
        if (!$isRangeSelection(selection)) return;

        // 選択範囲のアンカーノードを取得
        const anchorNode = selection.anchor.getNode();
        // アンカーノードが root ならそのノードを、そうでなければ最上位の要素を取得
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
        // 対象のノードが HeadingNode なら、そのタグを利用してblockTypeを設定
        if ($isHeadingNode(targetNode)) {
          const tag = targetNode.getTag();
          setBlockType(tag);
        } else {
          // そうでない場合は、ノードのタイプを利用してblockTypeを設定
          const nodeType = targetNode.getType();
          if (nodeType in SupportedBlockType) {
            setBlockType(nodeType as BlockType);
          } else {
            // それ以外ならデフォルトとして paragraph を設定
            setBlockType("paragraph");
          }
        }
      });
    });
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      // エディタの状態を変更するために、editor.update()を使用する
      editor.update(() => {
        // editorから選択範囲を取得
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // 選択範囲をheadingSizeに変更する
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  return (
    <div className="flex space-x-4 px-4 py-2 border-b border-gray-300">
      <button
        className="text-gray-400"
        type="button"
        role="checkbox"
        onClick={() => formatHeading("h1")}
      >
        H1
      </button>
      <button
        className="text-gray-400"
        type="button"
        role="checkbox"
        onClick={() => formatHeading("h2")}
      >
        H2
      </button>
      <button
        className="text-gray-400"
        type="button"
        role="checkbox"
        onClick={() => formatHeading("h3")}
      >
        H3
      </button>
    </div>
  );
};
