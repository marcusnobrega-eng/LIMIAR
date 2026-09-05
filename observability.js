(function setupLimiarObservability() {
  'use strict';

  const config = Object.assign({
    enabled: false,
    environment: 'production',
    release: 'limiar-web',
    respectDoNotTrack: true,
  }, window.LIMIAR_OBSERVABILITY_CONFIG || {});
  const enabled = Boolean(config.enabled)
    && !(config.respectDoNotTrack && navigator.doNotTrack === '1');
  const safeKeys = new Set([
    'component', 'duration_ms', 'error_name', 'event_type', 'language',
    'operation', 'provider', 'resource_type', 'status', 'viewport',
  ]);

  function safeAttributes(attributes) {
    return Object.fromEntries(Object.entries(attributes || {})
      .filter(([key, value]) => safeKeys.has(key) && ['string', 'number', 'boolean'].includes(typeof value))
      .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 160) : value]));
  }

  function payload(name, attributes) {
    return {
      name,
      timestamp: new Date().toISOString(),
      route: window.location.pathname,
      environment: config.environment,
      release: config.release,
      attributes: safeAttributes(attributes),
    };
  }

  function sendToProviders(entry, error) {
    if (!enabled) return;
    const safely = (callback) => {
      try {
        callback();
      } catch (providerError) {
        console.warn('LIMIAR observability provider failed.', providerError);
      }
    };
    if (window.Sentry) safely(() => {
      if (error) window.Sentry.captureException?.(error, { extra: entry.attributes, tags: { event: entry.name } });
      else window.Sentry.addBreadcrumb?.({ category: 'limiar', message: entry.name, data: entry.attributes, level: 'info' });
    });
    if (window.DD_RUM) safely(() => {
      if (error) window.DD_RUM.addError?.(error, entry.attributes);
      else window.DD_RUM.addAction?.(entry.name, entry.attributes);
    });
    if (window.newrelic) safely(() => {
      if (error) window.newrelic.noticeError?.(error, entry.attributes);
      else window.newrelic.addPageAction?.(entry.name, entry.attributes);
    });
    if (typeof window.opentelemetry?.api?.trace?.getTracer === 'function') safely(() => {
      const tracer = window.opentelemetry.api.trace.getTracer('limiar-web');
      const span = tracer.startSpan(entry.name, { attributes: entry.attributes });
      if (error) span.recordException(error);
      span.end();
    });
    if (typeof config.transport === 'function') safely(() => config.transport(entry, error));
  }

  function event(name, attributes) {
    sendToProviders(payload(name, attributes));
  }

  function error(cause, attributes) {
    const normalized = cause instanceof Error ? cause : new Error(String(cause || 'Unknown error'));
    sendToProviders(payload('application.error', {
      ...attributes,
      error_name: normalized.name,
    }), normalized);
  }

  function measure(name, startedAt, attributes) {
    event(name, {
      ...attributes,
      duration_ms: Math.max(0, Math.round(performance.now() - startedAt)),
    });
  }

  if (enabled && config.sentryDsn && window.Sentry?.init) {
    window.Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
      release: config.release,
      tracesSampleRate: Number(config.tracesSampleRate || 0),
      beforeSend(eventData) {
        if (eventData.request?.url) {
          try {
            eventData.request.url = new URL(eventData.request.url).origin + window.location.pathname;
          } catch (_error) {
            delete eventData.request.url;
          }
        }
        return eventData;
      },
    });
  }

  window.LIMIAR_OBSERVABILITY = Object.freeze({ enabled, event, error, measure });
  window.addEventListener('error', (browserEvent) => error(browserEvent.error || browserEvent.message, {
    component: 'window',
    operation: 'uncaught-error',
  }));
  window.addEventListener('unhandledrejection', (browserEvent) => error(browserEvent.reason, {
    component: 'window',
    operation: 'unhandled-rejection',
  }));
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    event('application.loaded', {
      component: 'application',
      duration_ms: navigation ? Math.round(navigation.loadEventEnd) : 0,
      language: document.documentElement.lang,
      viewport: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
    });
  }, { once: true });
}());
