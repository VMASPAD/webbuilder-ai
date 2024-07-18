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

    editor.on('load', () => {
      const styleManager = editor.StyleManager;
      const iframe = editor.Canvas.getFrameEl();
      const head = iframe.contentDocument?.head;
      
      // Añadir el enlace a Google Fonts en el iframe
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
      link.rel = 'stylesheet';
      head?.appendChild(link);
    });

    editor.Commands.add("groq", (editor: Editor) => {
      console.log("settings");
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
    return () => {
      editor.destroy();
    };
  }, []);
  return (
    <>
<div className="h-screen flex flex-col overflow-hidden">
      <section className="flex-grow grid grid-cols-8 overflow-hidden">
        <div id="blocks" className="overflow-y-auto">
          {/* Contenido de blocks */}
        </div>
        <div className="editor-row col-span-7 flex overflow-hidden">
          <div className="editor-canvas flex-grow overflow-hidden">
            <div id="gjs" className="h-full overflow-auto">
              {/* Contenido del editor */}
            </div>
          </div>
          <div className="panel__right w-64 flex flex-col overflow-hidden">
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
/* 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
Quiero que me generes un codigo de html aleatorio de lo que tu quieras, solo esribre el codigo html y nada mas solo CODIGO (ademas quiero que esribas solo la etiqueta style y luego solo el contenido que iria en la etiqueta body y no quiero que pongas las ``` al principio y al final del codigo) y recuerda que en la respuesta tiene que estar solo el codigo html
*/
