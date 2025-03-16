/**
 * Copyright 2025 caylmer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `RPG-Character`
 * 
 * @demo index.html
 * @element rpg-character
 */
export class RPGCharacter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-character";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/RPG-Character.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--RPG-Character-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
  <rpg-character seed="btopro"></rpg-character>
<rpg-character seed="${item.login}"></rpg-character>
<div>${item.login}</div>
<div>${item.contributions}</div>
<rpg-character seed="anothername"></rpg-character>
<rpg-character seed="yertasd298fu28j82"></rpg-character>
<rpg-character seed="uniquekhjgffty7y76t"></rpg-character>
<rpg-character seed="885322"></rpg-character>
<rpg-character seed="yertasd298fu28j82" hat="construction"></rpg-character>

<script type="module" src="https://cdn.hax.cloud/cdn/build/es6/node_modules/@haxtheweb/rpg-character/rpg-character.js"></script>

https://lit.dev/docs/templates/lists/
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}
async function getData() {
  const url = "https://api.github.com/repos/haxtheweb/webcomponents/contributors";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}


globalThis.customElements.define(RPG-Character.tag, RPG-Character);