// @ts-nocheck
import grapesjs, { Editor, PanelsConfig } from "grapesjs";
import Sun from '@/public/sun.svg'
let editor: Editor
export const panels: PanelsConfig  = {
  defaults: [
    {
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: false, 
          className: "btn-toggle-borders",
          label: `<u class="dark:text-black">B</u>`,
          command: "sw-visibility", 
        },
                {
          id: "preview",
          className: "fa fa-eye dark:text-black",
          command: "preview",
          attributes: { title: "Preview" },
        },
        {
          id: "clear-canvas",
          className: "btn-clear-canvas",
          label: `<img width="25px" src="./TdesignClearFormatting.svg" class="invert dark:filter invert-0"/>`,
          command: "clear-canvas",
        },
        {
          id: "export",
          className: "btn-open-export",
          label: `<img width="25px" src="./GravityUiCode.svg" class="invert dark:filter invert-0"/>`,
          command: "export-template",
          context: "export-template",
        },
        { 
          id: 'open-code-editor', 
          command: 'open-code-editor',
          attributes: { title: 'Abrir Code' },
          label: `<img width="25px" src="./MdiCodeBlockTags.svg" class="invert dark:filter invert-0"/>`, 
        },
        {
          id: "ia",
          className: "btn-open-export",
          label: `<img width="25px" src="./BiStars.svg" class="invert dark:filter invert-0"/>`,
          command: "groq",
          context: "export-template", 
        }, 
        {
          id: "settings",
          className: "btn-open-export",
          label: `<img width="25px" src="./UilSetting.svg" class="invert dark:filter invert-0"/>`,
          command: "open-settings",
          context: "export-template",
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: `<img width="25px" src="./TablerJson.svg" class="invert dark:filter invert-0"/>`,
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%;" class="text-black h-96">
                ${JSON.stringify(editor.getComponents(),0,2)}
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
          className:'dark:text-black',
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
          className:'dark:text-black',
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
          className:'dark:text-black',
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
        tc: false,
        cl: true,
        cr: false,
        bc: false,
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
          label: `<img width="25px" src="./BxsLayer.svg" class="invert dark:filter invert-0"/>`,
          command: "show-layers",
          // Once activated disable the possibility to turn it off
          togglable: false,
        },
        {
          id: "show-style",
          active: true,
          label: `<img width="25px" src="./MaterialSymbolsStyle.svg" class="invert dark:filter invert-0"/>`,
          command: "show-styles",
          togglable: false,
        },
        {
          id: "show-traits",
          active: true,
          label: `<img width="25px" src="./LucideTableProperties.svg" class="invert dark:filter invert-0"/>`,
          command: "show-traits",
          togglable: false,
        },
      ],
    },
  ],
};
