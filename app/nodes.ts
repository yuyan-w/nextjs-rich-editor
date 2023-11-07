import { HeadingNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { Klass, LexicalNode } from "lexical";

export const nodes: Array<Klass<LexicalNode>> = [HeadingNode, CodeNode];
