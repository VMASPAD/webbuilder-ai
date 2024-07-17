import { Editor } from "grapesjs";

let editorInstance: Editor | null = null;

export function setEditorInstance(editor: Editor) {
  editorInstance = editor;
  
}

export default function getEditorInstance() {
  
  return editorInstance;
}

