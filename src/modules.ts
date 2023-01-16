const EMPTY_PATH = require.resolve('../polyfills/empty.js');

export interface NodePolyfillsOptions {
  fs?: boolean;
  crypto?: boolean;
  sourceMap?: boolean;
  baseDir?: string;
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;
}

export function builtinsResolver(opts: NodePolyfillsOptions) {
  const libs = new Map();

  libs.set('node:process', require.resolve('../polyfills/process-es6'));
  libs.set('process', require.resolve('../polyfills/process-es6'));
  libs.set('node:buffer', require.resolve('../polyfills/buffer-es6'));
  libs.set('buffer', require.resolve('../polyfills/buffer-es6'));
  libs.set('node:util', require.resolve('../polyfills/util'));
  libs.set('util', require.resolve('../polyfills/util'));
  libs.set('node:sys', libs.get('util'));
  libs.set('sys', libs.get('util'));
  libs.set('node:events', require.resolve('../polyfills/events'));
  libs.set('events', require.resolve('../polyfills/events'));
  libs.set('node:stream', require.resolve('../polyfills/stream'));
  libs.set('stream', require.resolve('../polyfills/stream'));
  libs.set('node:path', require.resolve('../polyfills/path'));
  libs.set('path', require.resolve('../polyfills/path'));
  libs.set('node:querystring', require.resolve('../polyfills/qs'));
  libs.set('querystring', require.resolve('../polyfills/qs'));
  libs.set('node:punycode', require.resolve('../polyfills/punycode'));
  libs.set('punycode', require.resolve('../polyfills/punycode'));
  libs.set('node:url', require.resolve('../polyfills/url'));
  libs.set('url', require.resolve('../polyfills/url'));
  libs.set('node:string_decoder', require.resolve('../polyfills/string-decoder'));
  libs.set('string_decoder', require.resolve('../polyfills/string-decoder'));
  libs.set('node:http', require.resolve('../polyfills/http'));
  libs.set('http', require.resolve('../polyfills/http'));
  libs.set('node:https', require.resolve('../polyfills/http'));
  libs.set('https', require.resolve('../polyfills/http'));
  libs.set('node:os', require.resolve('../polyfills/os'));
  libs.set('os', require.resolve('../polyfills/os'));
  libs.set('node:assert', require.resolve('../polyfills/assert'));
  libs.set('assert', require.resolve('../polyfills/assert'));
  libs.set('node:constants', require.resolve('../polyfills/constants'));
  libs.set('constants', require.resolve('../polyfills/constants'));
  libs.set('node:_stream_duplex', require.resolve('../polyfills/readable-stream/duplex'));
  libs.set('_stream_duplex', require.resolve('../polyfills/readable-stream/duplex'));
  libs.set('node:_stream_passthrough', require.resolve('../polyfills/readable-stream/passthrough'));
  libs.set('_stream_passthrough', require.resolve('../polyfills/readable-stream/passthrough'));
  libs.set('node:_stream_readable', require.resolve('../polyfills/readable-stream/readable'));
  libs.set('_stream_readable', require.resolve('../polyfills/readable-stream/readable'));
  libs.set('node:_stream_writable', require.resolve('../polyfills/readable-stream/writable'));
  libs.set('_stream_writable', require.resolve('../polyfills/readable-stream/writable'));
  libs.set('node:_stream_transform', require.resolve('../polyfills/readable-stream/transform'));
  libs.set('_stream_transform', require.resolve('../polyfills/readable-stream/transform'));
  libs.set('node:timers', require.resolve('../polyfills/timers'));
  libs.set('timers', require.resolve('../polyfills/timers'));
  libs.set('node:console', require.resolve('../polyfills/console'));
  libs.set('console', require.resolve('../polyfills/console'));
  libs.set('node:vm', require.resolve('../polyfills/vm'));
  libs.set('vm', require.resolve('../polyfills/vm'));
  libs.set('node:zlib', require.resolve('../polyfills/zlib'));
  libs.set('zlib', require.resolve('../polyfills/zlib'));
  libs.set('node:tty', require.resolve('../polyfills/tty'));
  libs.set('tty', require.resolve('../polyfills/tty'));
  libs.set('node:domain', require.resolve('../polyfills/domain'));
  libs.set('domain', require.resolve('../polyfills/domain'));

  // not shimmed
  libs.set('node:dns', EMPTY_PATH);
  libs.set('dns', EMPTY_PATH);
  libs.set('node:dgram', EMPTY_PATH);
  libs.set('dgram', EMPTY_PATH);
  libs.set('node:child_process', EMPTY_PATH);
  libs.set('child_process', EMPTY_PATH);
  libs.set('node:cluster', EMPTY_PATH);
  libs.set('cluster', EMPTY_PATH);
  libs.set('node:module', EMPTY_PATH);
  libs.set('module', EMPTY_PATH);
  libs.set('node:net', EMPTY_PATH);
  libs.set('net', EMPTY_PATH);
  libs.set('node:readline', EMPTY_PATH);
  libs.set('readline', EMPTY_PATH);
  libs.set('node:repl', EMPTY_PATH);
  libs.set('repl', EMPTY_PATH);
  libs.set('node:tls', EMPTY_PATH);
  libs.set('tls', EMPTY_PATH);
  libs.set('node:fs', EMPTY_PATH);
  libs.set('fs', EMPTY_PATH);
  libs.set('node:crypto', EMPTY_PATH);
  libs.set('crypto', EMPTY_PATH);

  if (opts.fs) {
    libs.set('node:fs', require.resolve('../polyfills/browserify-fs'));
    libs.set('fs', require.resolve('../polyfills/browserify-fs'));
  }
  if (opts.crypto) {
    libs.set('node:crypto', require.resolve('../polyfills/crypto-browserify'));
    libs.set('crypto', require.resolve('../polyfills/crypto-browserify'));
  }

  return (importee: string) => {
    if (importee && importee.slice(-1) === '/') {
      importee === importee.slice(0, -1);
    }
    if (libs.has(importee)) {
      return {id: libs.get(importee), moduleSideEffects: false};
    }
    return null;
  }
}
