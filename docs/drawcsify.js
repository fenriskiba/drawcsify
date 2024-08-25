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

    // Embed Drawio XML into a div tag the viewer script will look for
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

    // Run viewer script to generate SVG from the Drawio XML
    const drawcsifyPlugin = function (hook) {
        hook.doneEach(() => {
            try {
                window.GraphViewer.processElements();
            } catch {
                console.error("Drawcsify: Unable to process Docsify XML.")
            }
        });
    };

    // Set styles to prevent Docsify styles from interfering with the diagram
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

    // Add drawioConverter() as the renderer for "drawio" code blocks
    window.$docsify.markdown = {
        renderer: {
            code: function (code, lang) {
                if (lang === 'drawio') {
                    return window.drawioConverter(code)
                } else {
                    return this.origin.code.apply(this, arguments);
                }
            }
        }
    };

    // Add plugin to Docsify's plugin array
    window.$docsify.plugins = [].concat($docsify.plugins || [], drawcsifyPlugin, drawcsifyStyles);
})();
