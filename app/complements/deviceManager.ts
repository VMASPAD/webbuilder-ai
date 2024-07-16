import grapesjs, { DeviceManagerConfig }  from 'grapesjs';

export const deviceManager: DeviceManagerConfig = {
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
  }