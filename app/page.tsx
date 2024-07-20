"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "./grapesjs.css";
import { Textarea } from "@/components/ui/textarea";
import "./main.scss";
import { ia } from "./ia";
import SettingsButton from "@/app/SettingsButton/SettingsButton";
import { blocks } from "./complements/blocks";
import { panels } from "./complements/panels";
import { styleManager } from "./complements/styles";
import { deviceManager } from "./complements/deviceManager";
import { command } from "./complements/commands";
import { setEditorInstance } from "./grapesjs";
import parserPostCSS from "grapesjs-parser-postcss";
import { createRoot } from 'react-dom/client';
import MonacoEditor from "./complements/editor";
import cssSearch from "./complements/css-search";

function ButtonDown() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientY } = event;
      const { innerHeight } = window;
      const threshold = innerHeight - 160; // Appears when the cursor is 100px from the bottom edge

      setIsVisible(clientY > threshold);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bottom-8 transition-all duration-300 ease-in-out z-10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-foreground text-white dark:text-primary p-4 rounded-lg shadow-lg">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
      </div>
    </div>
  );
}
export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "100vh",
      width: "auto",
      plugins: [parserPostCSS,(editor) => cssSearch(editor)],
      storageManager: true,
      selectorManager: {
        appendTo: ".styles-container",
      },
      layerManager: {
        appendTo: ".layers-container",
      },
      traitManager: {
        appendTo: ".traits-container",
      },
      commands: command,
      blockManager: blocks.blockManager,
      panels: panels,
      styleManager: styleManager,
      deviceManager: deviceManager, 
    });
    setEditorInstance(editor);

    editor.Commands.add("groq", (editor: Editor) => {
      console.log(editor.getHtml());
      const groq = localStorage.getItem("apigroq")
        ? localStorage.getItem("apigroq")
        : prompt("Insert API");

      if (!localStorage.getItem("apigroq") && groq) {
        localStorage.setItem("apigroq", groq);
      }

      if (groq) {
        generatedCode(groq);
      } else {
        console.error("El valor de groq es null o undefined");
      }
    });
    editor.Commands.add("open-settings", {
      run: function (editor) {
        setIsDialogOpen(true);
      },
    });
    async function generatedCode(api: string) {
      const groq = await ia(api);
      console.log(api);

      const component = editor.addComponents({
        type: "wrapper",
        components: groq,
        editable: true,
        draggable: true,
        droppable: true,
        stylable: true,
        resizable: true,
      })[0];
      editor.select(component);

      editor.Commands.run("core:component-select", { component });
    }
    editor.Commands.add("preview", {
      run(editor) {
        const blocks = document.getElementById("blocks") as HTMLElement | null;
        const allUi = document.getElementById("allUi") as HTMLElement | null;
        const panel = document.querySelector(".panel__right") as HTMLElement | null;
    
        // Verificar si los elementos existen antes de manipularlos
        if (blocks) {
          blocks.style.display = "none";
        } else {
          console.warn("Elemento 'blocks' no encontrado.");
        }
    
        if (allUi) {
          allUi.style.gridTemplateColumns = "repeat(1, minmax(0, 1fr))";
        } else {
          console.warn("Elemento 'allUi' no encontrado.");
        }
    
        if (panel) {
          panel.style.display = "none";
        } else {
          console.warn("Elemento 'panel__right' no encontrado.");
        }
    
        console.log(blocks);
        editor.runCommand("core:preview");
      },
      stop(editor) {
        const blocks = document.getElementById("blocks") as HTMLElement | null;
        const allUi = document.getElementById("allUi") as HTMLElement | null;
        const panel = document.querySelector(".panel__right") as HTMLElement | null;
    
        if (panel) {
          panel.style.display = "block";
        } else {
          console.warn("Elemento 'panel__right' no encontrado.");
        }
    
        if (allUi) {
          allUi.style.gridTemplateColumns = "repeat(8, minmax(0, 1fr))";
        } else {
          console.warn("Elemento 'allUi' no encontrado.");
        }
    
        if (blocks) {
          blocks.style.display = "block";
        } else {
          console.warn("Elemento 'blocks' no encontrado.");
        }
    
        editor.stopCommand("core:preview");
      },
    });
    
    editor.Commands.add('open-code-editor', {
      run(editor) {
        const modal = editor.Modal;
        modal.setTitle('My Custom Modal');
        modal.setContent(`
          <div id="modal-content" style="padding: 20px;">
            <h2>Code Editor</h2>
            <div id="monaco-container" style="width:100%; height:100%;"></div>  
          </div>
        `);
  
        // Show the modal
        modal.open();
  
        // Render the MonacoEditor component into the placeholder
        const monacoContainer = document.getElementById('monaco-container');
  
        if (monacoContainer) {
          const root = createRoot(monacoContainer);
          root.render(<MonacoEditor />);
        } 
      }
    });
  
    return () => {
      editor.destroy();
    };
  }, []);
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <section
          id="allUi"
          className="flex-grow grid grid-cols-8 overflow-hidden"
        >
          <div id="blocks" className="overflow-y-auto bg-foreground">
            {/* Contenido de blocks */}
          </div>
          <div className="editor-row col-span-7 flex overflow-hidden">
            <div className="editor-canvas flex-grow overflow-hidden">
              <div id="gjs" className="h-full overflow-auto">
                {/* Contenido del editor */}
              </div>
            </div>
            <div className="panel__right w-64 flex flex-col overflow-hidden gap-3">
              <div className="panel__switcher">
                {/* Contenido del switcher */}
              </div>
              <div className="flex-grow flex flex-col overflow-hidden">
                <div className="layers-container flex-grow overflow-y-auto">
                  {/* Contenido de layers */}
                </div>
                <div className="styles-container flex-grow overflow-y-auto">
                  {/* Contenido de styles */}
                </div>
                <div className="traits-container flex-grow overflow-y-auto">
                  {/* Contenido de traits */}
                </div>  
              </div>
            </div>
          </div>
        </section>
        <SettingsButton
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
        <ButtonDown />
      </div>
    </>
  );
}
/* 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 */
