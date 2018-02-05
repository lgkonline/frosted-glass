var modal = document.querySelectorAll(".modal");

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else if (hasClass(el, className))
        el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
}

function takeScreenshot(whenReady) {
    html2canvas(document.body, {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            // console.log(data);

            var bgElements = document.querySelectorAll(".bg");

            var i, length = bgElements.length;
            for (i = 0; i < length; i++) {
                bgElements[i].style.backgroundImage = "url(" + data + ")";
            }

            whenReady();
        }
    });
}

function showModal() {
    takeScreenshot(function () {
        addClass(document.body, "modal-in");
    });
}

function hideModal() {
    removeClass(document.body, "modal-in");
    addClass(document.body, "modal-out");

    setTimeout(function () {
        removeClass(document.body, "modal-out");
    }, 1000);
}