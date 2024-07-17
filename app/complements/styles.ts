import grapesjs, { StyleManagerConfig } from "grapesjs";

const displayValues = [
  'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid',
  'inline-grid', 'flow-root', 'none', 'contents', 'table', 'table-row',
  'table-cell', 'table-row-group', 'table-column', 'table-column-group',
  'table-footer-group', 'table-header-group', 'table-caption', 'list-item',
  'run-in', 'inherit', 'initial', 'revert', 'unset'
];

export const styleManager: StyleManagerConfig = {
  appendTo: ".styles-container",
  sectors: [
    {
      name: "General",
      open: !1,
      buildProps: [
        "display",
        "float",
        "position",
        "top",
        "right",
        "left",
        "bottom",
      ],
      properties:[
        {
          name: 'Display',
          property: 'display',
          type: 'select',
          defaults: 'block',
          options: displayValues.map(value => ({ id: value, name: value })),
        },
      ]
    },
    {
      name: "Flex",
      open: false,
      buildProps: [
        "flex-direction",
        "flex-wrap",
        "justify-content",
        "align-items",
        "align-content",
        "order",
        "flex-basis",
        "flex-grow",
        "flex-shrink",
        "align-self",
        "display",
      ],
    },
    {
      name: "Dimension",
      open: false,
      buildProps: [
        "width",
        "height",
        "max-width",
        "min-height",
        "margin",
        "padding",
      ],
    },
    {
      name: "Typography",
      open: !1,
      buildProps: [
        "font-family",
        "font-size",
        "font-weight",
        "letter-spacing",
        "color",
        "line-height",
        "text-align",
        "text-shadow",
      ],
      properties: [
        {
          name: "Font",
          property: "font-family",
          type: "select",
          defaults: "Arial",
          options: [
            {
              value: "Arial, Helvetica, sans-serif", name: "Arial",
              id: ""
            },
            {
              value: "Arial Black, Gadget, sans-serif", name: "Arial Black",
              id: ""
            },
            {
              value: "Comic Sans MS, cursive", name: "Comic Sans MS",
              id: ""
            },
            {
              value: "Courier New, Courier, monospace", name: "Courier New",
              id: ""
            },
            {
              value: "Georgia, serif", name: "Georgia",
              id: ""
            },
            {
              value: "Helvetica, serif", name: "Helvetica",
              id: ""
            },
            {
              value: "Impact, Charcoal, sans-serif", name: "Impact",
              id: ""
            },
            {
              value: "Lucida Sans Unicode, Lucida Grande, sans-serif",
              name: "Lucida Sans Unicode",
              id: ""
            },
            {
              value: "Tahoma, Geneva, sans-serif", name: "Tahoma",
              id: ""
            },
            {
              value: "Times New Roman, Times, serif", name: "Times New Roman",
              id: ""
            },
            {
              value: "Trebuchet MS, Helvetica, sans-serif",
              name: "Trebuchet MS",
              id: ""
            },
            {
              value: "Verdana, Geneva, sans-serif", name: "Verdana",
              id: ""
            },
            {
              value: '"Roboto", sans-serif', name: "Roboto",
              id: ""
            },
          ],
        },
        // ... otras propiedades de tipografía ...
      ],
    },
    {
      name:'Grid',
      open:!1,
      buildProps: ["grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows",],
       

    },
    {
      name: "Decorations",
      open: !1,
      properties: [
        "background-color",
        "border-radius",
        "border",
        "box-shadow",
        "background",
      ],
    },
    {
      name: "Extra",
      open: !1,
      properties: ["opacity", "transition", "transform"],
    },
  ],
};
