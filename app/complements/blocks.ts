// blocks.ts
import grapesjs, { EditorConfig } from "grapesjs";

export const blocks: EditorConfig = {
  blockManager: {
    appendTo: "#blocks",
    blocks: [
      {
        id: "section",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Section</b><img width="40px" src="./icons/TablerSection.svg" class="invert dark:filter invert-0"/></div>`,
        attributes: { class: "gjs-block-section" },
        content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
        category: "Layout",
      },
      {
        id: "text",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Text</b><img width="40px" src="./icons/text.svg" class="invert dark:filter invert-0"/></div>`,
        content: '<div data-gjs-type="text">Insert your text here</div>',
        category: "Basic",
      },
      {
        id: "image",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Image</b><img width="40px" src="./icons/image.svg" class="invert dark:filter invert-0"/></div>`,
        select: true,
        content: { type: "image" },
        activate: true,
        category: "Media",
      },
      {
        id: "header",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Header</b><img width="40px" src="./icons/earth.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<header>
              <h2>Header Title</h2>
              <p>Header subtitle</p>
            </header>`,
        category: "Layout",
      },
      {
        id: "footer",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Footer</b><img width="40px" src="./icons/map.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<footer>
              <p>Footer content</p>
            </footer>`,
        category: "Layout",
      },
      {
        id: "article",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Article</b><img width="40px" src="./icons/notebook-tabs.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<article>
              <h3>Article Title</h3>
              <p>Article content</p>
            </article>`,
        category: "Layout",
      },
      {
        id: "aside",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Aside</b><img width="40px" src="./icons/panel-right-open.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<aside>
              <h4>Aside Title</h4>
              <p>Aside content</p>
            </aside>`,
        category: "Layout",
      },
      {
        id: "nav",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Navigation</b><img width="40px" src="./icons/LucideNavigation.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<nav>
              <ul>
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </nav>`,
        category: "Layout",
      },
      {
        id: "form",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Form</b><img width="40px" src="./icons/frame.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<form>
              <input type="text" placeholder="Name"/>
              <input type="email" placeholder="Email"/>
              <button type="submit">Submit</button>
            </form>`,
        category: "Forms",
      },
      {
        id: "table",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Table</b><img width="40px" src="./icons/table.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<table>
              <thead>
                <tr><th>Heading 1</th><th>Heading 2</th></tr>
              </thead>
              <tbody>
                <tr><td>Data 1</td><td>Data 2</td></tr>
                <tr><td>Data 3</td><td>Data 4</td></tr>
              </tbody>
            </table>`,
        category: "Basic",
      },
      {
        id: "list",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">List</b><img width="40px" src="./icons/list.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>`,
        category: "Basic",
      },
      {
        id: "blockquote",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Blockquote</b><img width="40px" src="./icons/message-square-quote.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<blockquote>
              <p>This is a blockquote</p>
            </blockquote>`,
        category: "Basic",
      },
      {
        id: "figure",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Figure</b><img width="40px" src="./icons/images.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<figure>
              <img src="https://via.placeholder.com/150" alt="Placeholder image">
              <figcaption>Figure caption</figcaption>
            </figure>`,
        category: "Media",
      },
      {
        id: "button",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Button</b><img width="40px" src="./icons/circle-arrow-out-up-left.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<button>Click Me</button>`,
        category: "Basic",
      },
      {
        id: "iframe",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">iFrame</b><img width="40px" src="./icons/newspaper.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<iframe src="https://www.example.com" width="300" height="200"></iframe>`,
        category: "Media",
      },
      {
        id: "video",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Video</b><img width="40px" src="./icons/monitor-play.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<video controls>
              <source src="https://www.example.com/video.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>`,
        category: "Media",
      },
      {
        id: "audio",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Audio</b><img width="40px" src="./icons/audio-lines.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<audio controls>
              <source src="https://www.example.com/audio.mp3" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>`,
        category: "Media",
      },
      {
        id: "svg",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">SVG</b><img width="40px" src="./icons/TablerSvg.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>`,
        category: "Media",
      },
      {
        id: "progress",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Progress</b><img width="40px" src="./icons/loader.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<progress value="50" max="100">50%</progress>`,
        category: "Basic",
      },
      {
        id: "meter",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Meter</b><img width="40px" src="./icons/ruler.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<meter value="0.6">60%</meter>`,
        category: "Basic",
      },
      {
        id: "details",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Details</b><img width="40px" src="./icons/book-text.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<details>
              <summary>Details</summary>
              <p>Details content</p>
            </details>`,
        category: "Basic",
      },
      {
        id: "code",
        label: `<div class="flex flex-col justify-center items-center gap-3"><b class="text-secondary dark:text-secondary font-bold text-xs">Code</b><img width="40px" src="./icons/code.svg" class="invert dark:filter invert-0"/></div>`,
        content: `<pre><code>const a = 'Hello World';</code></pre>`,
        category: "Basic",
      },
    ],
  },
};
