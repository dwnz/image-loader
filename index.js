function ImageLoader(grid, imagePath, width, height, swatchColor, onclick, callback) {
    var self = this;

    function _randomId() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4());
    }

    self.img = new Image();
    self.grid = grid;
    self.callback = callback;
    self.id = _randomId();

    self.image = {
        path: imagePath,
        width: width,
        height: height,
        swatch: swatchColor,
        click: onclick
    };

    self.display = {
        width: self.image.width,
        height: self.image.height
    };

    /**
     * Update image class when image is loaded
     */
    self.onImageLoad = function () {
        document.getElementById("img-" + self.id).setAttribute('src', self.image.path);

        self.holder.setAttribute('class', 'imageholder imageholder--loaded');
        self.imageElement.setAttribute('class', 'image image--loaded');
    };

    /**
     * Calculate sizes to fit in grid
     */
    self.resize = function () {
        var gridWidth = self.grid.offsetWidth;
        var diff = 0;

        if (self.image.width > self.image.height) {
            diff = gridWidth / self.image.width;
            self.display.width = self.image.width * diff;
            self.display.height = self.image.height * diff;
        } else {
            diff = gridWidth / self.image.height;
            self.display.width = gridWidth;
            self.display.height = self.image.height * diff;
        }
    };

    /**
     * Set everything up
     */
    self.start = function () {
        self.grid = document.getElementById(self.grid);
        self.resize();

        window.addEventListener("resize", self.windowResize);

        self.holder = document.createElement('div');
        self.holder.setAttribute('class', 'imageholder imageholder--notloaded');

        self.imageElement = document.createElement('img');
        self.imageElement.setAttribute('data-src', self.image.path);
        self.imageElement.setAttribute('class', 'image image--notloaded');
        self.imageElement.setAttribute('style', 'height:' + self.display.height + 'px;width:' + self.display.width + 'px;background:' + self.image.swatch + ';');
        self.imageElement.setAttribute('id', "img-" + self.id);

        if (self.image.click) {
            self.imageElement.onclick = self.imageClick;
        }

        self.holder.appendChild(self.imageElement);

        self.grid.appendChild(self.holder);

        self.img.onload = self.onImageLoad;
        self.img.src = self.image.path;

        if (self.callback) {
            callback(self);
        }
    };

    /**
     * Calls image click method with
     * ImageObject, ImageID, Event
     * @param event
     */
    self.imageClick = function (event) {
        self.image.click(self.image, 'img-' + self.id, event);
    };

    /**
     * On window resize event
     */
    self.windowResize = function () {
        self.resize();
        self.imageElement.setAttribute('style', 'height:' + self.display.height + 'px;width:' + self.display.width + 'px;background:' + self.image.swatch + ';');
    };

    self.start();
}