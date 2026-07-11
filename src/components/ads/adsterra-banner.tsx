/**
 * Adsterra's banner snippet sets a global `atOptions` variable and immediately
 * reads it in a synchronously-loaded invoke.js. That's fine in plain HTML,
 * but multiple banners on one React page would race on the same global and
 * a script tag injected via dangerouslySetInnerHTML doesn't execute anyway.
 * Rendering each unit inside its own iframe fully isolates it — safe with
 * any number of banners on the same page, no ordering dependency.
 */
export function AdsterraBanner({
  adKey,
  width,
  height,
  className,
}: {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}) {
  const srcDoc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style></head><body>
<script>
  atOptions = {
    'key': '${adKey}',
    'format': 'iframe',
    'height': ${height},
    'width': ${width},
    'params': {}
  };
</script>
<script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
</body></html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden", display: "block" }}
      scrolling="no"
      title="Advertisement"
      className={className}
    />
  );
}
