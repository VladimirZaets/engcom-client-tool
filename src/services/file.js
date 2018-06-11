export const download = (path, content) => {
    let urlObject = window.URL || window.webkitURL || window,
        exportBlob = new Blob([content]),
        saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
        ev = document.createEvent('MouseEvents');

    saveLink.href = urlObject.createObjectURL(exportBlob);
    saveLink.download = path;

    ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(ev);
};