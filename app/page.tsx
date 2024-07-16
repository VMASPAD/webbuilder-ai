// @ts-nocheck
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
function ButtonDown() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
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
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
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
      commands:command,
      blockManager: blocks.blockManager,
      panels: panels,
      styleManager: styleManager,
      deviceManager: deviceManager,
    });
     
    editor.Commands.add("groq", (editor: Editor) => {
      // Usar un operador ternario para verificar si existe 'apigroq' en localStorage
      const groq = localStorage.getItem("apigroq")
        ? localStorage.getItem("apigroq")
        : prompt("Insert API");

      // Si el usuario ingresó una nueva API, guardarla en localStorage
      if (!localStorage.getItem("apigroq") && groq) {
        localStorage.setItem("apigroq", groq);
      }

      generatedCode(groq);
    });
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
  }, []);
  return (
    <>
      <section className="grid grid-cols-8">
        <div id="blocks"></div>
        <div className="editor-row col-span-7">
          <div className="editor-canvas">
            <div id="gjs"></div>
          </div>
          <div className="panel__right">
            <div className="panel__switcher"></div>
            <div className="layers-container"></div>
            <div className="styles-container"></div>
            <div className="traits-container"></div>
          </div>
        </div>
      </section>
      <SettingsButton
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <ButtonDown />
    </>
  );
}
/* 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
Quiero que me generes un codigo de html aleatorio de lo que tu quieras, solo esribre el codigo html y nada mas solo CODIGO (ademas quiero que esribas solo la etiqueta style y luego solo el contenido que iria en la etiqueta body y no quiero que pongas las ``` al principio y al final del codigo) y recuerda que en la respuesta tiene que estar solo el codigo html
*/
