# WebBuilder AI

WebBuilder AI es un proyecto diseñado para agilizar la forma en que se crean las páginas web, utilizando  la inteligencia artificial para generar componentes y diseños web de manera dinámica. Este proyecto aprovecha las capacidades de GrapesJS, un marco de creación web de código abierto, e integra IA (Grok) para automatizar el proceso de diseño, haciendo que el desarrollo web sea más accesible y eficiente.

## Características

- **Generación Dinámica de Componentes**: Utiliza IA para generar componentes web basados en las entradas del usuario, agiliza la creacion de elementos web.
- **Componentes Editables**: Los componentes generados son completamente editables, lo que permite a los usuarios personalizarlos según sus necesidades.
- **Interfaz de Arrastrar y Soltar**: Ofrece una interfaz fácil de usar de arrastrar y soltar para una composición de página sencilla.
- **Soporte de Diseño Responsivo**: Permite la creación de diseños web responsivos que funcionan perfectamente en diferentes dispositivos.
- **Código Exportable**: Permite a los usuarios exportar el código HTML, CSS y JavaScript generado para su uso en otros proyectos o plataformas.

## Cómo Funciona

La funcionalidad principal de WebBuilder AI gira en torno a la función `generatedCode`, que se comunica con GROK para generar componentes web con una clave API proporcionada. Esta función se activa mediante un comando personalizado dentro del editor GrapesJS.

### Inicialización

El proyecto inicializa el editor GrapesJS con una configuración personalizada, configurando el canvas, los paneles, el gestor de dispositivos y el gestor de bloques. También define comandos personalizados para acciones como limpiar el canvas, cambiar dispositivos e invocar el proceso de generación de IA.

```javascript
const editor = grapesjs.init({
  container: "#gjs",
  fromElement: true,
  width: "auto",
  storageManager: true,
  // Configuración adicional...
});
```