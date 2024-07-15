 
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "./grapesjs.css";
import { Textarea } from "@/components/ui/textarea";
import "./main.scss";
import { ia } from "./ia";
import SettingsButton from "@/app/SettingsButton/SettingsButton";
function ButtonDown(){
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
};
export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "100vh",
      width: "auto",
      storageManager: true,
      layerManager: {
        appendTo: ".layers-container",
      },
      traitManager: {
        appendTo: '.traits-container',
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
          {
            id: "header",
            label: "<b>Header</b>",
            content: `<header>
              <h2>Header Title</h2>
              <p>Header subtitle</p>
            </header>`,
          },
          {
            id: "footer",
            label: "<b>Footer</b>",
            content: `<footer>
              <p>Footer content</p>
            </footer>`,
          },
          {
            id: "article",
            label: "<b>Article</b>",
            content: `<article>
              <h3>Article Title</h3>
              <p>Article content</p>
            </article>`,
          },
          {
            id: "aside",
            label: "<b>Aside</b>",
            content: `<aside>
              <h4>Aside Title</h4>
              <p>Aside content</p>
            </aside>`,
          },
          {
            id: "nav",
            label: "<b>Navigation</b>",
            content: `<nav>
              <ul>
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </nav>`,
          },
          {
            id: "form",
            label: "<b>Form</b>",
            content: `<form>
              <input type="text" placeholder="Name"/>
              <input type="email" placeholder="Email"/>
              <button type="submit">Submit</button>
            </form>`,
          },
          {
            id: "table",
            label: "<b>Table</b>",
            content: `<table>
              <thead>
                <tr><th>Heading 1</th><th>Heading 2</th></tr>
              </thead>
              <tbody>
                <tr><td>Data 1</td><td>Data 2</td></tr>
                <tr><td>Data 3</td><td>Data 4</td></tr>
              </tbody>
            </table>`,
          },
          {
            id: "list",
            label: "<b>List</b>",
            content: `<ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>`,
          },
          {
            id: "blockquote",
            label: "<b>Blockquote</b>",
            content: `<blockquote>
              <p>This is a blockquote</p>
            </blockquote>`,
          },
          {
            id: "figure",
            label: "<b>Figure</b>",
            content: `<figure>
              <img src="https://via.placeholder.com/150" alt="Placeholder image">
              <figcaption>Figure caption</figcaption>
            </figure>`,
          },
          {
            id: "button",
            label: "<b>Button</b>",
            content: `<button>Click Me</button>`,
          },
          {
            id: "iframe",
            label: "<b>iFrame</b>",
            content: `<iframe src="https://www.example.com" width="300" height="200"></iframe>`,
          },
          {
            id: "video",
            label: "<b>Video</b>",
            content: `<video controls>
              <source src="https://www.example.com/video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>`,
          },
          {
            id: "audio",
            label: "<b>Audio</b>",
            content: `<audio controls>
              <source src="https://www.example.com/audio.mp3" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>`,
          },
          {
            id: "svg",
            label: "<b>SVG</b>",
            content: `<svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>`,
          },
          {
            id: "progress",
            label: "<b>Progress</b>",
            content: `<progress value="50" max="100">50%</progress>`,
          },
          {
            id: "meter",
            label: "<b>Meter</b>",
            content: `<meter value="0.6">60%</meter>`,
          },
          {
            id: "details",
            label: "<b>Details</b>",
            content: `<details>
              <summary>Details</summary>
              <p>Details content</p>
            </details>`,
          },
          {
            id: "code",
            label: "<b>Code</b>",
            content: `<pre><code>const a = 'Hello World';</code></pre>`,
          },
        ],
      },
      panels: {
        defaults: [
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              {
                id: "device-desktop",
                label: "Desktop",
                command: "set-device-desktop",
                active: true,
                togglable: false,
                attributes:{
                  title: 'Desktop'
                }
              },
              {
                id: "device-tablet",
                label: "Tablet",
                command: "set-device-tablet",
                active: true,
                togglable: false,
                attributes:{
                  title: 'Tablet'
                }
              },
              {
                id: "device-mobile",
                label: "Movile",
                command: "set-device-mobile",
                togglable: false,
                attributes:{
                  title: 'Movile'
                }
              },
            ],
          },
          {
            id: "layers",
            el: ".panel__right",
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: 0,
              cl: 1,
              cr: 0,
              bc: 0,
              keyWidth: "flex-basis",
            },
          },
          {
            id: "panel-switcher",
            el: ".panel__switcher",
            buttons: [
              {
                id: "show-layers",
                active: true,
                label:`<img width="25px" src="./BxsLayer.svg" class="fill-white"/>`,
                command: "show-layers",
                // Once activated disable the possibility to turn it off
                togglable: false,
              },
              {
                id: "show-style",
                active: true,
                label: `<img width="25px" src="./MaterialSymbolsStyle.svg" class="fill-white"/>`,
                command: "show-styles",
                togglable: false,
              }, 
              {
                id: 'show-traits',
                active: true,
                label: `<img width="25px" src="./LucideTableProperties.svg" class="fill-white"/>`,
                command: 'show-traits',
                togglable: false,
            }
            ],
          },
        ],
      },
      selectorManager: {
        appendTo: ".styles-container",
      },
      styleManager: {
        appendTo: ".styles-container",
        sectors: [
          {
            name: "Dimension",
            open: false,
            // Use built-in properties
            buildProps: ["width", "min-height", "padding"],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: "integer",
                name: "The width", // Label for the property
                property: "width", // CSS property (if buildProps contains it will be extended)
                units: ["px", "%"], // Units, available only for 'integer' types
                defaults: "auto", // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["background-color", "box-shadow", "custom-prop",],
            properties: [
              {
                id: "custom-prop",
                name: "Custom Label",
                property: "font-size",
                type: "select",
                defaults: "32px",
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  {
                    value: "12px", name: "Tiny",
                    id: ""
                  },
                  {
                    value: "18px", name: "Medium",
                    id: ""
                  },
                  {
                    value: "32px", name: "Big",
                    id: ""
                  },
                ],
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
            name: "Tablet",
            width: "758", // this value will be used on canvas width
            widthMedia: "980px", // this value will be used in CSS @media
          },
          {
            name: "Mobile",
            width: "325px", // this value will be used on canvas width
            widthMedia: "480px", // this value will be used in CSS @media
          },
        ],
      },
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
    editor.Commands.add("show-layers", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getLayersEl(row) {
        return row.querySelector(".layers-container");
      },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "";
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "none";
      },
    });
    editor.Commands.add("show-styles", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getStyleEl(row) {
        return row.querySelector(".styles-container");
      },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "";
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "none";
      },
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "clear-canvas",
          className: "btn-clear-canvas",
          label: `<img width="25px" src="./TdesignClearFormatting.svg" class="fill-white"/>`,
          command: "clear-canvas",
        },
        {
          id: "export",
          className: "btn-open-export",
          label: `<img width="25px" src="./GravityUiCode.svg" class="fill-white"/>`,
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "ia",
          className: "btn-open-export",
          label: `<img width="25px" src="./BiStars.svg" class="fill-white"/>`,
          command: "groq",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "preview",
          className: "fa fa-eye",
          command: () => editor.runCommand("preview"),
          attributes: { title: "Preview" },
        },
        {
          id: "settings",
          className: "btn-open-export",
          label: `<img width="25px" src="./UilSetting.svg" class="fill-white"/>`,
          command: "open-settings",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: `<img width="25px" src="./TablerJson.svg" class="fill-white"/>`,
          context: "show-json",
          command(editor) {
            console.log(editor);
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
    const commands = editor.Commands;
editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop')
});
editor.Commands.add('set-device-tablet', {
  run: editor => editor.setDevice('Tablet')
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile')
});

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
    editor.Commands.add("open-settings", {
      run: function (editor) {
        setIsDialogOpen(true);
      },
    });
    editor.Commands.add('show-traits', {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest('.editor-row');
    return row.querySelector('.traits-container');
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = '';
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = 'none';
  },
});
  }, []);
  return (
    <>
      <section className="grid grid-cols-8">
        <div id="blocks"></div>
        <div className="editor-row col-span-7">
          <div className="editor-canvas">
            <div id="gjs"> 
            </div>
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
