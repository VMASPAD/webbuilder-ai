import grapesjs, { StyleManagerConfig } from "grapesjs";

export const styleManager: StyleManagerConfig = {
  appendTo: ".styles-container",
  sectors: [
    {
      name: "General",
      open: !1,
      properties: [
        "display",
        "float",
        "position",
        "top",
        "right",
        "left",
        "bottom",
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
      ],properties: [
		{
		  name: 'Font',
		  property: 'font-family',
		  type: 'select',
		  defaults: 'Arial',
		  options: [
			{ value: 'Arial, Helvetica, sans-serif', name: 'Arial' },
			{ value: 'Arial Black, Gadget, sans-serif', name: 'Arial Black' },
			{ value: 'Comic Sans MS, cursive', name: 'Comic Sans MS' },
			{ value: 'Courier New, Courier, monospace', name: 'Courier New' },
			{ value: 'Georgia, serif', name: 'Georgia' },
			{ value: 'Helvetica, serif', name: 'Helvetica' },
			{ value: 'Impact, Charcoal, sans-serif', name: 'Impact' },
			{ value: 'Lucida Sans Unicode, Lucida Grande, sans-serif', name: 'Lucida Sans Unicode' },
			{ value: 'Tahoma, Geneva, sans-serif', name: 'Tahoma' },
			{ value: 'Times New Roman, Times, serif', name: 'Times New Roman' },
			{ value: 'Trebuchet MS, Helvetica, sans-serif', name: 'Trebuchet MS' },
			{ value: 'Verdana, Geneva, sans-serif', name: 'Verdana' },
			{ value: '"Roboto", sans-serif', name: 'Roboto' }
		  ]
		},
		// ... otras propiedades de tipografía ...
	  ]
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
