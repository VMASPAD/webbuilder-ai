// @ts-nocheck

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "./grapesjs.css";
import { Textarea } from "@/components/ui/textarea";
import "./main.scss";
import { ia } from "./ia";
import BottomHoverMenu from "./buttondown/ButtonDown";
import CustomDialog from "./settings/Settings";
import ReactDOM from 'react-dom/client';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: "#gjs",
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      width: "auto",
      // Disable the storage manager for the moment
      storageManager: true,
      layerManager: {
        appendTo: "#layers-container",
      },
      // Avoid any default panel
      panels: {
        defaults: [
          {
            id: "layers",
            el: "#layers-container",
            // Make the panel resizable
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: 0, // Top handler
              cl: 1, // Left handler
              cr: 0, // Right handler
              bc: 0, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: "flex-basis",
            },
          },
          {
            id: "panel-devices",
            el: ".gjs-frame-wrapper__top",
            buttons: [
              {
                id: "device-desktop",
                label: "D",
                command: "set-device-desktop",
                active: true,
                togglable: false,
              },
              {
                id: "device-mobile",
                label: "M",
                command: "set-device-mobile",
                togglable: false,
              },
            ],
          },
        ],
      },
      deviceManager: {
        devices: [
          {
            name: "Desktop",
            width: "", // default size
          },
          {
            name: "Mobile",
            width: "320px", // this value will be used on canvas width
            widthMedia: "480px", // this value will be used in CSS @media
          },
        ],
      },
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: "image",
            label: "Image",
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: "image" },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
        ],
      },
    });
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: 'clear-canvas',
          className: 'btn-clear-canvas',
          label: 'Clear',
          command: 'clear-canvas',
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Code",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "ia",
          className: "btn-open-export",
          label: `<img width="20px" src="./BiStars.svg" class="fill-white"/>`,
          command: "groq",
          context: "export-template", // For grouping context of buttons from the same panel
        },        {
          id: "settings",
          className: "btn-open-export",
          label: `<img width="20px" src="./UilSetting.svg" class="fill-white"/>`,
          command: "open-settings",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            console.log(editor)
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
    });
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
    editor.Commands.add('clear-canvas', {
      run: function(editor) {
        const components = editor.getComponents();
        components.reset(); // Esto elimina todos los componentes
        editor.setComponents([]); // Asegura que el canvas esté completamente vacío
        editor.UndoManager.clear(); // Limpia el historial de deshacer/rehacer
        editor.setStyle(''); // Limpia todos los estilos
        editor.Modal.close(); // Cierra cualquier modal abierto
        editor.store(); // Guarda el estado actual (canvas vacío)
        return 'Canvas cleared successfully';
      }
    });
    
    const commands = editor.Commands;
    commands.add("groq", (editor) => {
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

    async function generatedCode(api) {
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
    editor.Commands.add('open-settings', {
      run: function(editor) {
        setIsDialogOpen(true);
      }
    });
  }, []);
  return (
    <>
      <BottomHoverMenu />
      <section className="h-screen">
      <div className=" grid grid-cols-8 !h-screen">
        <div id="blocks" className="h-screen"></div>
          <div id="gjs" className="col-span-6 !h-screen">
            <p>move your mouse down</p>
          </div>
          <div id="layers-container"></div>
        </div>
      </section>      <CustomDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />

    </>
  );
}
/* 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
Quiero que me generes un codigo de html aleatorio de lo que tu quieras, solo esribre el codigo html y nada mas solo CODIGO (ademas quiero que esribas solo la etiqueta style y luego solo el contenido que iria en la etiqueta body y no quiero que pongas las ``` al principio y al final del codigo) y recuerda que en la respuesta tiene que estar solo el codigo html
*/
