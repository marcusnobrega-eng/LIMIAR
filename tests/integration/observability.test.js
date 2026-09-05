import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('../../observability.js', import.meta.url), 'utf8');

describe('observability adapter', () => {
  it('forwards allow-listed metadata without exposing arbitrary values', () => {
    const events = [];
    const dom = new JSDOM('<!doctype html><html lang="en"><body></body></html>', {
      runScripts: 'outside-only',
      url: 'https://example.test/LIMIAR/?station=private',
    });
    dom.window.LIMIAR_OBSERVABILITY_CONFIG = {
      enabled: true,
      respectDoNotTrack: false,
      transport(entry) {
        events.push(entry);
      },
    };
    dom.window.eval(source);
    dom.window.LIMIAR_OBSERVABILITY.event('station.loaded', {
      component: 'station-panel',
      status: 'success',
      station_code: '83250000',
    });

    const event = events.find((entry) => entry.name === 'station.loaded');
    expect(event.route).toBe('/LIMIAR/');
    expect(event.attributes).toEqual({ component: 'station-panel', status: 'success' });
  });
});
