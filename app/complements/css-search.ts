// @ts-nocheck
import { Editor } from 'grapesjs';
import { html, render } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map.js'
import getEditorInstance from '../grapesjs';

export const cssSearch = (editor: Editor, opts = {}) => {
  const sm = editor.SelectorManager;
  const listEl = document.createElement('div');
  const prefix = 'gjs-';
  const selIdAttr = 'data-sel-id';

  const options = {
    ...{
      enablePerformance: false,
      enableCount: true,
      containerStyle: `
      .${prefix}suggest {
        position: absolute;
        z-index: 999;
        padding: 0;
        margin: 0;
        left: 0;
        right: 0;
        transition: opacity .25s ease;
        text-align: left;
        padding: 0 5px;
      }
    `,
      tagStyle: `
      div.${prefix}suggest__class {
        list-style: none;
        cursor: pointer;
        display: inline-block;
      }
      .${prefix}suggest__count {
        vertical-align: baseline;
        font-size: x-small;
      }
    `
    },
    ...opts
  }
  
  
  async function update(show, filter = '') {
    options.enablePerformance && console.time('update')
    options.enablePerformance && console.time('all-comps')

    const gjsProjectStr = localStorage.getItem('gjsProject')
    const gjsProject = gjsProjectStr ? JSON.parse(gjsProjectStr) : { styles: [] }

    const selectorNamesPromise = Promise.all(
      gjsProject.styles
        .flatMap((style) => style.selectors.map((selector) => selector))
        .filter((selector) => typeof selector === 'string') 
    )
    const allComps = []
    if (options.enableCount) {
      editor.Pages.getAll().forEach((page) => {
        page.getMainComponent().onAll((comp) => allComps.push(comp))
      })
    }
    options.enablePerformance && console.timeEnd('all-comps')
    const startWord = 'gjs-cv-unscale'
    const endWord = 'sp-choose'

    let foundStart = false
    const selectorsPromise = Promise.all(
      sm.getAll().filter((sel) => {
        if (sel.getLabel() === startWord) {
          foundStart = true
          return false
        }

        if (foundStart && sel.getLabel() === endWord) {
          foundStart = false
          return false
        }

        return (
          !foundStart &&
          !sel.private &&
          !sm.getSelected().includes(sel) &&
          (sel.getLabel().toLowerCase().includes(filter.toLowerCase()) || filter === '')
        )
      })
    )

    const [selectorNames, selectors] = await Promise.all([selectorNamesPromise, selectorsPromise])
 
    let classCounts = {}
    allComps.forEach((comp) => {
      if (comp && typeof comp.getClasses === 'function') {
        comp.getClasses().forEach((className) => {
          classCounts[className] = (classCounts[className] || 0) + 1
        })
      }
    })

    const tags = options.enableCount
      ? selectors
          .map((sel) => ({
            sel,
            count: classCounts[sel.id] || 0
          }))
          .sort((first, second) => second.count - first.count)
          .filter(({ sel, count }) => count > -1)
      : selectors.map((sel) => ({ sel, count: 0 }))
 
    render(
      html`
        <div
          class="${prefix}suggest ${prefix}one-bg"
          style=${styleMap({
            opacity: show ? '1' : '0',
            'pointer-events': show ? 'initial' : 'none'
          })}
        >
          ${tags
            .map(
              ({ sel, count }) => html`
                <div
                  data-sel-id=${sel.id}
                  class="${prefix}clm-tag ${prefix}three-bg ${prefix}suggest__class"
                  @mousedown=${() => select(sel.id)}
                >
                  <span data-tag-name="">${sel.getLabel()}</span>
                  ${options.enableCount
                    ? html`<span
                        class="${prefix}clm-tag-status ${prefix}suggest__count"
                        data-tag-status=""
                        >${count}</span
                      >`
                    : ''}
                </div>
              `
            )}
        </div>
      `,
      listEl
    )
    options.enablePerformance ?? console.timeEnd('update')
  }

  function select(selId) {
    options.enablePerformance ?? console.time('select')
    const selector = sm.getAll().find((s) => s.id === selId)
    sm.addSelected(selector)
    options.enablePerformance ?? console.timeEnd('select')
  }
  const setupUI = () => {
    const tags = document.querySelector(`#${prefix}clm-tags-field`); 
    if (!tags) {
      console.warn(`Element with id "${prefix}clm-tags-field" not found`);
      return;
    }

    const input = document.querySelector(`#${prefix}clm-new`);
    if (!input) {
      console.warn(`Element with id "${prefix}clm-new" not found`);
      return;
    }

    tags.parentNode!.insertBefore(listEl, tags.nextSibling);
    const styleEl = document.createElement('style');
    styleEl.innerHTML = options.containerStyle + options.tagStyle;
    document.head.appendChild(styleEl);

    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    input.addEventListener(
      'keyup',
      debounce(() => update(true, (input as HTMLInputElement).value), 750)
    );

    input.addEventListener(
      'blur',
      debounce(() => update(false), 750)
    );
    input.addEventListener(
      'focus',
      debounce(() => update(true, (input as HTMLInputElement).value), 750)
    );
  };

  // Use MutationObserver to wait for the element to be added to the DOM
  const observer = new MutationObserver((mutations, obs) => {
    const container = editor.getContainer();
    if (container) {
      setupUI();
      obs.disconnect(); // Stop observing once we've set up the UI
    }
  });

  if (typeof window !== 'undefined') {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  editor.on('load', () => {
    if (typeof window === 'undefined') return; // Ensure we're on the client side
    setupUI();
  });
};

export default cssSearch