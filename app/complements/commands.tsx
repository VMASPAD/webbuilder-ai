// @ts-nocheck
import grapesjs, { CommandObject, CommandsConfig, Editor, ICommand }  from 'grapesjs';
import { ia } from "../ia";
const editor: Editor = grapesjs.init
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
        id: 'groq',
        run: (editor: Editor) => {
          const groq = localStorage.getItem("apigroq")
            ? localStorage.getItem("apigroq")
            : prompt("Insert API");

          if (!localStorage.getItem("apigroq") && groq) {
            localStorage.setItem("apigroq", groq);
          }

          generatedCode(groq);
        }
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
      }
    ]
}

  async function generatedCode(api: string) {
    const groq = await ia(api);
    console.log(api);

    // Crear un componente editable
    const component = editor.addComponents({
      type: "wrapper", // Usar 'wrapper' en lugar de 'default' para mayor flexibilidad
      components: groq, // Usar 'components' en lugar de 'content' para estructurar el contenido
      editable: true, // Hacer el componente editable
      draggable: true, // Permitir que el componente sea arrastrado
      droppable: true, // Permitir que se puedan soltar otros componentes dentro
      stylable: true, // Permitir que se pueda estilizar
      resizable: true, // Permitir que se pueda redimensionar
    })[0]; // [0] porque addComponents devuelve un array

    // Seleccionar el componente recién creado
    editor.select(component);

    // Desplazarse hasta el componente
    editor.Commands.run("core:component-select", { component });
  }