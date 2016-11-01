# smartimageloader

```
new ImageLoader(GridID, ImageUrl, Width, Height, PreloadBackgroundHex, OnClick, Callback)
```

## Installing

```
bower install smartimageloader --save
```

## Arguments

### GridID

The ID of the HTML element you want to use

### Image URL

The image URL

### Width

The width of the image

### Height

The height of the image

### PreloadBackgroundHex

The color to apply to the image box before the image is loaded

### OnClick

Fires when an image is clicked.

```
function OnImageClick(imageObject, imageId, event)
```

### Callback

Fires when an image is finished being generated, returns ImageLoader object

```
function Callback(imageLoader)
```

## CSS Classes

```
div.imageholder > img.image
```

### .imageholder

DIV that holds the image tag

#### .imageholder.imageholder--notloaded

When the image hasn't been loaded

#### .imageholder.imageholder--loaded

When the image has been loaded

### .image

The image element

#### .image.image--notloaded

When the image hasn't been loaded

#### .image.image--loaded

When the image has loaded

## Example

See [example/index.html](example/index.html)
