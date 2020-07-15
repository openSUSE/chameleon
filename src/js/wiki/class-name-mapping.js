const classNameMapping = [
  { select: 'error', remove: 'error', add: 'alert alert-danger' },
  { select: 'mw-htmlform-submit', remove: 'mw-htmlform-submit', add: 'btn btn-primary' },
  { select: 'mw-warning-with-logexcerpt', remove: 'mw-warning-with-logexcerpt', add: 'alert alert-info' },
  { select: 'wikitable', remove: 'wikitable', add: 'table' }
];

classNameMapping.forEach(m => {
  const warnings = document.getElementsByClassName(m.select);

  while (warnings.length) {
    const list = warnings.item(0).classList;
    list.add(m.add);
    list.remove(m.remove);
  }
});
