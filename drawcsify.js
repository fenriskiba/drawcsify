(function () {
    const chatMap = {
        "&": "&amp;",
        "'": "&#x27;",
        "`": "&#x60;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
    };
    
    // TODO: Determine if there is a pre-existing tool for this
    const escapeHTML = (string) => {
        if (typeof string !== "string") return string;
        return string.replace(/[&'`"<>]/g, function (match) {
            return chatMap[match];
        });
    };

    window.drawioConverter = function (xml, idx = new Date().getTime()) {
        let mxGraphData = {
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
            </div>
        `;
    };

    // TODO: Figure out how this works
    const drawcsifyPlugin = function (hook) {
        hook.doneEach((hook) => {
            try {
                window.GraphViewer.processElements();
            } catch { }
        });
    };

    // Add plugin to docsify's plugin array
    $docsify = $docsify || {};

    $docsify.markdown = {
        renderer: {
            code: function (code, lang) {
                if (lang === 'drawio' && window.drawioConverter) {
                    return window.drawioConverter(code)
                } else {
                    return this.origin.code.apply(this, arguments);
                }
            }
        }
    };

    $docsify.plugins = [].concat($docsify.plugins || [], drawcsifyPlugin);
})();
