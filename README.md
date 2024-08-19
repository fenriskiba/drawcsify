# Drawcsify

This is a docsify plugin that can convert drawio xml Data to a picture in your docs.

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