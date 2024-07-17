// @ts-nocheck
import { Editor } from 'grapesjs';
import { getEditorInstance } from '../page';

const editor = getEditorInstance();
export function addCustomFont(editor, fontName, fontUrl) {
    // 1. Agregar la fuente al head del documento
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: "${fontName}";
        src: url("${fontUrl}");
      }
    `;
    document.head.appendChild(style);
  
    // 2. Agregar la fuente a las opciones del StyleManager
    const styleManager = editor.StyleManager;
    const fontProperty = styleManager.getProperty('typography', 'font-family');
    
    if (fontProperty) {
      const options = fontProperty.get('options') || [];
      options.unshift({ value: fontName, name: fontName });
      fontProperty.set('options', options);
    } else {
      console.warn('Font-family property not found in StyleManager');
    }
  
    // 3. Actualizar el canvas del editor para que reconozca la nueva fuente
    editor.Canvas.getDocument().fonts.ready.then(() => {
      editor.refresh();
    });
  }
    