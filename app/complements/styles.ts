import grapesjs, { StyleManagerConfig } from "grapesjs";

// Define el tipo SelectOption
interface SelectOption {
  id: string;
  value: string;
  name: string;
}

// Lista de valores de display
const displayValues: string[] = [
  'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid',
  'inline-grid', 'flow-root', 'none', 'contents', 'table', 'table-row',
  'table-cell', 'table-row-group', 'table-column', 'table-column-group',
  'table-footer-group', 'table-header-group', 'table-caption', 'list-item',
  'run-in', 'inherit', 'initial', 'revert', 'unset'
];

// Función para obtener las fuentes almacenadas
const getStoredFonts = (): SelectOption[] => {
  if (typeof window !== 'undefined') {
    const storedFonts = JSON.parse(localStorage.getItem('fonts') || '[]');
    return storedFonts
      .filter((font: { active: boolean }) => font.active)
      .map((font: { name: string }, index: number) => ({
        id: String(index),  // Usa un identificador único
        value: `"${font.name}", sans-serif`,
        name: font.name,
      }));
  }
  return [];
};

// Fuentes por defecto
const defaultFonts: SelectOption[] = [
  { id: "1", value: "Arial, Helvetica, sans-serif", name: "Arial" },
  { id: "2", value: "Arial Black, Gadget, sans-serif", name: "Arial Black" },
  { id: "3", value: "Comic Sans MS, cursive", name: "Comic Sans MS" },
  { id: "4", value: "Courier New, Courier, monospace", name: "Courier New" },
  { id: "5", value: "Georgia, serif", name: "Georgia" },
  { id: "6", value: "Helvetica, serif", name: "Helvetica" },
  { id: "7", value: "Impact, Charcoal, sans-serif", name: "Impact" },
  { id: "8", value: "Lucida Sans Unicode, Lucida Grande, sans-serif", name: "Lucida Sans Unicode" },
  { id: "9", value: "Tahoma, Geneva, sans-serif", name: "Tahoma" },
  { id: "10", value: "Times New Roman, Times, serif", name: "Times New Roman" },
  { id: "11", value: "Trebuchet MS, Helvetica, sans-serif", name: "Trebuchet MS" },
  { id: "12", value: "Verdana, Geneva, sans-serif", name: "Verdana" },
  { id: "13", value: '"Roboto", sans-serif', name: "Roboto" },
];

// Configuración del StyleManager
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
      properties: [
        {
          name: 'Display',
          property: 'display',
          type: 'select',
          defaults: 'block',
          options: displayValues.map(value => ({ id: value, name: value, value })),
        },
      ],
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
      properties: [
        {
          name: 'Display',
          property: 'display',
          type: 'select',
          defaults: 'block',
          list: [
            { value: 'block', id: "block" },
            { value: 'inline', id: "inline" },
            { value: 'inline-block', id: "inline-block" },
            { value: 'flex', id: "flex" },
            { value: 'grid', id: "grid" }
          ],
        },
        {
          name: 'Grid Template Columns',
          property: 'grid-template-columns',
          type: 'composite',
          properties: [
            {
              name: 'Type',
              property: 'grid-template-columns-type',
              type: 'select',
              defaults: 'repeat',
              list: [
                { value: 'repeat', id: "repeat" },
                { value: 'minmax', id: "minmax" },
                { value: 'custom', id: "custom" }
              ],
            },
            {
              name: 'Value',
              property: 'grid-template-columns-value',
              type: 'text',
            },
          ],
        },
        {
          name: 'Grid Template Rows',
          property: 'grid-template-rows',
          type: 'composite',
          properties: [
            {
              name: 'Type',
              property: 'grid-template-rows-type',
              type: 'select',
              defaults: 'repeat',
              list: [
                { value: 'repeat', id: "repeat" },
                { value: 'minmax', id: "minmax" },
                { value: 'custom', id: "custom" }
              ],
            },
            {
              name: 'Value',
              property: 'grid-template-rows-value',
              type: 'text',
            },
          ],
        },
        {
          name: 'Grid Auto Columns',
          property: 'grid-auto-columns',
          type: 'select',
          defaults: 'auto',
          list: [
            { value: 'auto', id: "auto" },
            { value: 'min-content', id: "min-content" },
            { value: 'max-content', id: "max-content" },
            { value: 'minmax(min-content, max-content)', id: "minmax(min-content, max-content)" }
          ],
        },
        {
          name: 'Grid Auto Rows',
          property: 'grid-auto-rows',
          type: 'select',
          defaults: 'auto',
          list: [
            { value: 'auto', id: "auto" },
            { value: 'min-content', id: "min-content" },
            { value: 'max-content', id: "max-content" },
            { value: 'minmax(min-content, max-content)', id: "minmax(min-content, max-content)" }
          ],
        },
        {
          name: 'Grid Auto Flow',
          property: 'grid-auto-flow',
          type: 'select',
          defaults: 'row',
          list: [
            { value: 'row', id: "row" },
            { value: 'column', id: "column" },
            { value: 'row dense', id: "row dense" },
            { value: 'column dense', id: "column dense" }
          ],
        },
        {
          name: 'Grid Column Gap',
          property: 'grid-column-gap',
          type: 'slider',
          defaults: '0',
          min: 0,
          max: 50,
          step: 1,
        },
        {
          name: 'Grid Row Gap',
          property: 'grid-row-gap',
          type: 'slider',
          defaults: '0',
          min: 0,
          max: 50,
          step: 1,
        },
        {
          name: 'Justify Items',
          property: 'justify-items',
          type: 'select',
          defaults: 'stretch',
          list: [
            { value: 'start', id: "start" },
            { value: 'end', id: "end" },
            { value: 'center', id: "center" },
            { value: 'stretch', id: "stretch" }
          ],
        },
        {
          name: 'Align Items',
          property: 'align-items',
          type: 'select',
          defaults: 'stretch',
          list: [
            { value: 'start', id: "start" },
            { value: 'end', id: "end" },
            { value: 'center', id: "center" },
            { value: 'stretch', id: "stretch" }
          ],
        },
        {
          name: 'Justify Content',
          property: 'justify-content',
          type: 'select',
          defaults: 'start',
          list: [
            { value: 'start', id: "start" },
            { value: 'end', id: "end" },
            { value: 'center', id: "center" },
            { value: 'stretch', id: "stretch" },
            { value: 'space-around', id: "space-around" },
            { value: 'space-between', id: "space-between" },
            { value: 'space-evenly', id: "space-evenly" }
          ],
        },
        {
          name: 'Align Content',
          property: 'align-content',
          type: 'select',
          defaults: 'stretch',
          list: [
            { value: 'start', id: "start" },
            { value: 'end', id: "end" },
            { value: 'center', id: "center" },
            { value: 'stretch', id: "stretch" },
            { value: 'space-around', id: "space-around" },
            { value: 'space-between', id: "space-between" },
            { value: 'space-evenly', id: "space-evenly" }
          ],
        },
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
      name: "Border",
      open: false,
      properties: [ 
        "border-radius",
        "border", 
      ],
    },
    {
      name: "Extra",
      open: false,
      properties: ["opacity", "transition", "transform"],
    },
  ],
};

// Función para actualizar las opciones de tipografía
export const updateTypographyOptions = (editor: any) => {
  const typographySector = editor.StyleManager.getSector('Typography');
  if (typographySector) {
    const fontProperty = typographySector.getProperty('font-family');
    if (fontProperty) {
      fontProperty.set('options', [...defaultFonts, ...getStoredFonts()]);
    }
  }
};
