(function () {
    const chatMap = {
        "&": "&amp;",
        "'": "&#x27;",
        "`": "&#x60;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
    };

    // TODO: Determine if there is a pre-existing tool that could do this instead of re-inventing the wheel
    const escapeHTML = (string) => {
        if (typeof string !== "string") return string;
        return string.replace(/[&'`"<>]/g, function (match) {
            return chatMap[match];
        });
    };

    window.drawioConverter = function (xml) {
        const mxGraphData = {
            "highlight": "#0000ff",
            "nav": true,
            "resize": true,
            "toolbar": "pages zoom layers tags lightbox",
            "edit": "_blank",
            xml,
        };

        return `
            <div class="mxgraph"
                style="max-width: 100%;
                    border: 1px solid transparent;
                    background-color: white"
                data-mxgraph="${escapeHTML(JSON.stringify(mxGraphData))}">
            </div>`;
    };

    const drawcsifyPlugin = function (hook) {
        hook.doneEach(() => {
            try {
                window.GraphViewer.processElements();
            } catch {
                // TODO: Figure out what can cause this and provide some kind of error messaging
            }
        });
    };

    const drawcsifyStyles = function (hook) {
        hook.afterEach((html) => {
            const ds = `
                <style>
                    .mxgraph * {
                        all: revert-layer;
                    }

                    .geDiagramContainer * {
                        all: revert-layer;
                    }
                </style>`;

            return html + ds;
        });
    };

    // Add plugin to docsify's plugin array
    $docsify = $docsify || {};

    $docsify.markdown = {
        renderer: {
            code: function (code, lang) {
                if (lang === 'drawio') {
                    return window.drawioConverter(code)
                } else {
                    // TODO: Figure out what can cause this and determine if it should provide some kind of error messaging
                    return this.origin.code.apply(this, arguments);
                }
            }
        }
    };

    $docsify.plugins = [].concat($docsify.plugins || [], drawcsifyPlugin, drawcsifyStyles);
})();
