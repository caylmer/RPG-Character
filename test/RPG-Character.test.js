import { html, fixture, expect } from '@open-wc/testing';
import "../RPG-Character.js";

describe("RPG-Character test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <RPG-Character
        title="title"
      ></RPG-Character>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
