// blocks.ts
import grapesjs, { EditorConfig } from 'grapesjs';

export const blocks: EditorConfig = {
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
      }
}