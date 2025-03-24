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
export class githubrpgcontributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.org=''
    this.repo=''
    this.limit = 10;
    this.contributors = [];
    
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      limit: { type: Number },
      org: { type: String },
      repo: { type: String },
      contributors: { type: Array },
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
      .rpg-wrapper {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: var(--ddd-spacing-4);
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border-radius: var(--ddd-border-radius);
      }

      h3 span {
        font-size: var(--RPG-Character-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("org") || changedProperties.has("repo")) {
      this.getData();
    }
  }
  getData() {
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    try {
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.contributors = [];
          this.contributors = data;
        }});
    } catch (error) {
      console.error("Error", error);
    }}
  

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
<h3>GitHub Repo: <a href="https://github.com/${this.org}/${this.repo}">${this.org}/${this.repo}</a></h3>
  </div>
<div class="rpg-wrapper">
${this.contributors.filter((item, index) => index < this.limit).map(item => html`
<div class ="contributor">
  <rpg-character seed="${item.login}"></rpg-character>
<div class="content">
  <a href=http://github.com/${item.login}">${item.login}</a>
  <br>
  Contributions: ${item.contributions}
</div>
</div>
`)}
</div>`
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}


globalThis.customElements.define(githubrpgcontributors.tag, githubrpgcontributors);