import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

describe('published document', () => {
  it('has unique element identifiers', () => {
    const document = new JSDOM(html).window.document;
    const ids = [...document.querySelectorAll('[id]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('loads the application as a native module', () => {
    const document = new JSDOM(html).window.document;
    const application = [...document.querySelectorAll('script[src]')]
      .find((script) => script.getAttribute('src')?.startsWith('app.js?'));
    expect(application?.getAttribute('type')).toBe('module');
  });
});
