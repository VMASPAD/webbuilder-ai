// src/MonacoEditor.js
import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import getEditorInstance from '../grapesjs';

const MonacoEditor = () => {
  const editorContainerRef = useRef(null);
  const [editor, setEditor] = useState(null);
  
  useEffect(() => {
    const editorInstance = getEditorInstance();
    if (!editorInstance) return;
    
    const handleEditorLoad = () => {
      if (editorContainerRef.current) {
        const monacoEditor = monaco.editor.create(editorContainerRef.current, {
          value: editorInstance.getHtml(),
          language: 'html',
          theme: 'vs-dark',
        });
        setEditor(monacoEditor);
      }
    };

    if (editorInstance.isReady) {
      handleEditorLoad();
    } else {
      editorInstance.on('load', handleEditorLoad);
    }

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={editorContainerRef}
      style={{ width: '100%', height: '100%', border: '1px solid grey' }}
    ></div>
  );
};

export default MonacoEditor;
