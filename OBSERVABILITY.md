# LIMIAR Observability

Observability is optional and disabled by default. The public atlas works without a monitoring account, cookies, tokens, or telemetry requests.

## Supported providers

`observability.js` detects provider browser SDKs already loaded by a deployment:

- Sentry for browser errors and optional traces;
- Datadog RUM for actions and errors;
- New Relic Browser for page actions and errors;
- OpenTelemetry Web for provider-neutral spans;
- a custom `transport(entry, error)` callback for another collector.

Do not load all commercial providers together. Choose one error and performance provider, or use an OpenTelemetry collector, based on deployment requirements.

## Configuration

Set `window.LIMIAR_OBSERVABILITY_CONFIG` before `observability.js` loads. Keep account identifiers and credentials outside this repository.

```html
<script>
  window.LIMIAR_OBSERVABILITY_CONFIG = {
    enabled: true,
    environment: 'production',
    release: 'limiar-web@2026.09',
    sentryDsn: 'configured-by-the-deployment',
    tracesSampleRate: 0.05,
  };
</script>
```

Load and initialize the selected provider browser SDK before `observability.js`.

## Privacy rules

- Never send station JSON, station codes, coordinates, searches, selected dates, exported data, or URL query parameters.
- Event attributes are restricted to the allowlist in `observability.js`.
- The route contains only `window.location.pathname`.
- Do Not Track is respected by default.
- Keep production telemetry off until provider privacy and retention settings have been reviewed.

## Events

The application reports coarse technical signals only:

- `application.loaded`
- `application.ready`
- `data.loaded`
- `station.loaded`
- `application.error`

These events detect loading failures and regressions. They do not analyze scientific use or user behavior.
