import grapesjs, { StyleManagerConfig } from "grapesjs";

const displayValues = [
  'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid',
  'inline-grid', 'flow-root', 'none', 'contents', 'table', 'table-row',
  'table-cell', 'table-row-group', 'table-column', 'table-column-group',
  'table-footer-group', 'table-header-group', 'table-caption', 'list-item',
  'run-in', 'inherit', 'initial', 'revert', 'unset'
];

const getStoredFonts = (): { value: string; name: string }[] => {
  const storedFonts = JSON.parse(localStorage.getItem('fonts') || '[]');
  return storedFonts
    .filter((font: { active: boolean }) => font.active)
    .map((font: { name: string }) => ({
      value: `"${font.name}", sans-serif`,
      name: font.name,
    }));
};

const defaultFonts = [
  { value: "Arial, Helvetica, sans-serif", name: "Arial" },
  { value: "Arial Black, Gadget, sans-serif", name: "Arial Black" },
  { value: "Comic Sans MS, cursive", name: "Comic Sans MS" },
  { value: "Courier New, Courier, monospace", name: "Courier New" },
  { value: "Georgia, serif", name: "Georgia" },
  { value: "Helvetica, serif", name: "Helvetica" },
  { value: "Impact, Charcoal, sans-serif", name: "Impact" },
  { value: "Lucida Sans Unicode, Lucida Grande, sans-serif", name: "Lucida Sans Unicode" },
  { value: "Tahoma, Geneva, sans-serif", name: "Tahoma" },
  { value: "Times New Roman, Times, serif", name: "Times New Roman" },
  { value: "Trebuchet MS, Helvetica, sans-serif", name: "Trebuchet MS" },
  { value: "Verdana, Geneva, sans-serif", name: "Verdana" },
  { value: '"Roboto", sans-serif', name: "Roboto" },
];

export const styleManager: StyleManagerConfig = {
  appendTo: ".styles-container",
  sectors: [
    {
      name: "General",
      open: false,
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
      open: false,
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
          options: [...defaultFonts, ...getStoredFonts()],
        },
        // ... otras propiedades de tipografía ...
      ],
    },
    {
      name: 'Grid',
      open: false,
      buildProps: [
        "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", 
        "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", 
        "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", 
        "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows",
      ],
    },
    {
      name: "Decorations",
      open: false,
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
      open: false,
      properties: ["opacity", "transition", "transform"],
    },
  ],
};

export const updateTypographyOptions = (editor: grapesjs.Editor) => {
  const typographySector = editor.StyleManager.getSector('Typography');
  if (typographySector) {
    const fontProperty = typographySector.getProperty('font-family');
    if (fontProperty) {
      fontProperty.set('options', [...defaultFonts, ...getStoredFonts()]);
    }
  }
};