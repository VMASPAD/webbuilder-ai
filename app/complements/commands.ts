//@ts-nocheck
import grapesjs, { CommandFunction, CommandObject, CommandsConfig, Editor, ICommand }  from 'grapesjs';
import { ia } from "../ia"; 
export const command: CommandsConfig = 
{defaults:[
      {
        id: 'clear-canvas',
        run: function (editor: Editor) {
          const components = editor.getComponents();
          components.reset();
          editor.setComponents([]);
          editor.UndoManager.clear();
          editor.setStyle("");
          editor.Modal.close();
          editor.store();
          return "Canvas cleared successfully";
        }
      },
      {
        id: 'show-layers',
        getRowEl(editor: Editor) { return editor.getContainer().closest(".editor-row"); },
        getLayersEl(row) { return row.querySelector(".layers-container"); },
        run(editor: Editor, sender) { 
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = "";
        },
        stop(editor: Editor, sender) {
          const lmEl = this.getLayersEl(this.getRowEl(editor));
          lmEl.style.display = "none";
        }
      },
      {
        id: 'show-styles',
        getRowEl(editor: Editor) { return editor.getContainer().closest(".editor-row"); },
        getStyleEl(row) { return row.querySelector(".styles-container"); },
        run(editor: Editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = "";
        },
        stop(editor: Editor, sender) {
          const smEl = this.getStyleEl(this.getRowEl(editor));
          smEl.style.display = "none";
        }
      },
      {
        id: 'set-device-desktop',
        run: (editor: Editor) => editor.setDevice("Desktop")
      },
      {
        id: 'set-device-tablet',
        run: (editor: Editor) => editor.setDevice("Tablet")
      },
      {
        id: 'set-device-mobile',
        run: (editor: Editor) => editor.setDevice("Mobile")
      }, 
      {
        id: 'show-traits',
        getTraitsEl(editor: Editor) {
          const row = editor.getContainer().closest(".editor-row");
          return row.querySelector(".traits-container");
        },
        run(editor: Editor, sender) {
          this.getTraitsEl(editor).style.display = "";
        },
        stop(editor: Editor, sender) {
          this.getTraitsEl(editor).style.display = "none";
        }
      },
      {
        id: 'darkMode', 
        run(editor: Editor, sender) { 
          document.documentElement.classList.toggle('dark');
        },
        stop(editor: Editor, sender) { 
        }
      }
    ]
} 