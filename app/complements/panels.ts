 
import grapesjs, { Editor, PanelsConfig } from "grapesjs";

let editor: Editor
export const panels: PanelsConfig = {
  defaults: [
    {
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
          id: "preview",
          className: "fa fa-eye",
          command: "core:preview",
          attributes: { title: "Preview" },
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
    },
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
          attributes: {
            title: "Desktop",
          },
        },
        {
          id: "device-tablet",
          label: "Tablet",
          command: "set-device-tablet",
          active: true,
          togglable: false,
          attributes: {
            title: "Tablet",
          },
        },
        {
          id: "device-mobile",
          label: "Movile",
          command: "set-device-mobile",
          togglable: false,
          attributes: {
            title: "Movile",
          },
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
          label: `<img width="25px" src="./BxsLayer.svg" class="fill-white"/>`,
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
          id: "show-traits",
          active: true,
          label: `<img width="25px" src="./LucideTableProperties.svg" class="fill-white"/>`,
          command: "show-traits",
          togglable: false,
        },
      ],
    },
  ],
};
