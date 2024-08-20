# Drawcsify

This is a docsify plugin based on [KonghaYao/docsify-drawio](https://github.com/KonghaYao/docsify-drawio) that can convert drawio xml Data to a picture in your docs.

Created my own fork because the project hasn't been touched in 3 years and I wanted a simpler setup process, to use the official Draw.io viewer and fix a few styling issues I encountered with backgrounds and conflicts with Docsify Themeable.

## First - write your drawio File Path in Your Markdown File

```md
[filename](https://cdn.jsdelivr.net/npm/docsify-drawio/test.drawio ':include :type=code')
```

## Second - Add Some Script in your docsify html File.

!! It must put after your window.$docsify 

```html
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
<script src='https://cdn.jsdelivr.net/npm/docsify-drawio/drawio.js'></script>
```
