import React, { useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Editor, useMonaco } from '@monaco-editor/react';
import getEditorInstance from '../grapesjs';

const MonacoEditor = () => {
  const grapesjs = getEditorInstance();
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);
  const monaco = useMonaco();

  const formatEditorContent = (editorRef: any) => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const handleEditorDidMount = (editor: any, language: any) => {
    switch (language) {
      case 'html':
        htmlEditorRef.current = editor;
        break;
      case 'css':
        cssEditorRef.current = editor;
        break;
      case 'javascript':
        jsEditorRef.current = editor;
        break;
      default:
        break;
    }
    setTimeout(() => formatEditorContent({ current: editor }), 100);
  };

  const setNewData = () => {
    const getHTML = htmlEditorRef.current?.getValue() || grapesjs.getHtml();
    const getCSS = cssEditorRef.current?.getValue() || grapesjs.getCss();
    const getJs = jsEditorRef.current?.getValue() || '';

    grapesjs?.setComponents(getHTML);
    grapesjs?.setStyle(getCSS);
    console.log('HTML:', getHTML);
    console.log('CSS:', getCSS);
    console.log('JS:', getJs);
  };

  return (
    <div className="flex flex-col gap-10">
      <Tabs defaultValue="HTML" className="h-96">
        <TabsList>
          <TabsTrigger value="HTML">HTML</TabsTrigger>
          <TabsTrigger value="CSS">CSS</TabsTrigger>
          <TabsTrigger value="JS">JS</TabsTrigger>
        </TabsList>
        <TabsContent value="HTML" className="h-96">
          <Editor
            height="100%"
            defaultLanguage="html"
            defaultValue={grapesjs?.getHtml()}
            theme="vs-dark"
            onMount={(editor) => handleEditorDidMount(editor, 'html')}
          />
        </TabsContent>
        <TabsContent value="CSS" className="h-96">
          <Editor
            height="100%"
            defaultLanguage="css"
            defaultValue={grapesjs?.getCss()}
            theme="vs-dark"
            onMount={(editor) => handleEditorDidMount(editor, 'css')}
          />
        </TabsContent>
        <TabsContent value="JS" className="h-96">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue=""
            theme="vs-dark"
            onMount={(editor) => handleEditorDidMount(editor, 'javascript')}
          />
        </TabsContent>
      </Tabs>
      <Button onClick={setNewData}>Save</Button>
    </div>
  );
};

export default MonacoEditor;
