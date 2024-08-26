# Drawcsify

This is a [Docsify](https://docsify.js.org/#/) plugin that can embed [Draw.io](https://app.diagrams.net/) diagrams into your documentation.

[Demo](https://fenriskiba.github.io/drawcsify/#/)

## Features
* Simplified setup process
* Compatibility with [docsify-themeable](https://jhildenbiddle.github.io/docsify-themeable/#/) styles
* Background added to the diagram
* Uses the official Draw.io viewer

## Setup
To add Drawcsify to your Docsify site, add the following lines to your `index.html` after Docsify.

```html
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
<script src='//cdn.jsdelivr.net/npm/drawcsify@latest'></script>
```

Then to embed a diagram, simply add a link to the file with `':include :type=code'` added at the end.

```markdown
[filename](/example.drawio ':include :type=code')
```

**Note:** The file *needs* to end in `.drawio` or the extension will not recognize it as a Draw.io file.

## License and Credit
This project is based on [KonghaYao/docsify-drawio](https://github.com/KonghaYao/docsify-drawio) and carries over the MIT License with it.