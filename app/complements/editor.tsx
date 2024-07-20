import React, { useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Editor, useMonaco, Monaco } from '@monaco-editor/react';
import getEditorInstance from '../grapesjs';

const MonacoEditor = () => {
  const grapesjs = getEditorInstance();
  const htmlEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const cssEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const jsEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const monaco = useMonaco();

  const formatEditorContent = (editorRef: React.MutableRefObject<Monaco.editor.IStandaloneCodeEditor | null>) => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor, language: string) => {
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
    }
    setTimeout(() => formatEditorContent({ current: editor }), 100);
  };

  function setNewData() {
    const getHTML = htmlEditorRef.current?.getValue();
    const getCSS = cssEditorRef.current?.getValue();
    const getJs = jsEditorRef.current?.getValue();

    grapesjs?.setComponents(getHTML === '' || undefined ? grapesjs.getHtml() : getHTML);
    grapesjs?.setStyle(getCSS === '' || undefined ? grapesjs.getCss() : getCSS);
    console.log('HTML:', getHTML);
    console.log('CSS:', getCSS);
    console.log('JS:', getJs);
  }

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
            defaultValue={grapesjs?.getJs()}
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
