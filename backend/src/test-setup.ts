import { FormatRegistry } from '@sinclair/typebox';

FormatRegistry.Set('email', (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
);

FormatRegistry.Set('uuid', (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),
);
