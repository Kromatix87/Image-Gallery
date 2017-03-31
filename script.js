/// <reference path="typings/index.d.ts" />
$(document).ready(function () {
    // hover animations for the image containers
    $("div.gs-gallery-img-container").hover(
        function () {
            $(this).find("div.gs-gallery-img-title").animate({
                top: "30%"
            }, 200);
        },
        function () {
            $(this).find("div.gs-gallery-img-title").animate({
                top: "100%"
            }, 200);
        }
    );

    // store modal html in variable
    var galleryModalHtml = $('<div id="galleryModal1" style="display: none;" imgNumber="" class="no-select">' +
        '<div class="gs-gallery-modal-bg">' +
        '<div class="gs-gallery-modal" style="z-index:1000;">' +
        '<div class="gs-gallery-modal-close">&times;</div>' +
        '<div class="gs-gallery-modal-inner">' +
        '<div class="gs-gallery-modal-title"></div>' +
        '<div class="gs-gallery-modal-img" style="">' +
        '<img src="http://placehold.it/100x50">' +
        '</div>' +
        '<div class="gs-gallery-modal-caption"></div>' +
        '<div class="gs-gallery-modal-position"></div>' +
        '</div>' +
        '<div class="gs-gallery-modal-prev"></div>' +
        '<div class="gs-gallery-modal-next"></div>' +
        '</div>' +
        '</div>' +
        '</div>');

    // function to populate the modal when needed
    function populateModal(imgContainer, thisGalleryModalHtml) {
        // populate the gallery modal using properties from imgContainer
        $(thisGalleryModalHtml).attr({
            "imgNumber": $(imgContainer).attr("imgNumber"),
            "position": $(imgContainer).attr("position")
        });
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-title").text($(imgContainer).find("div.gs-gallery-img-title > p").text());
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-img > img").attr("src", $(imgContainer).find("div.gs-gallery-img").css("background-image").replace('url("', '').replace('")', ''));
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-caption").text($(imgContainer).find("div.gs-gallery-img-caption > p").text());
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-position").text($(imgContainer).attr("imgDispNumber"));

        // calculate what to show when clicking next
        if ($(imgContainer).attr("position") == "last") {
            // the first image
            nextImgContainer = $("#imageGallery").find("div.gs-gallery-img-container[position='first']");
        } else {
            // the next image
            nextImgContainer = $(imgContainer).next();
        }
        // assign click action to next button
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-next").click(function () {
            // make the new one
            nextGalleryModalHtml = populateModal(nextImgContainer, $(galleryModalHtml).clone());
            $(nextGalleryModalHtml).find("div.gs-gallery-modal-close").click(function () {
                $(nextGalleryModalHtml).fadeOut(200, function () {
                    $(this).remove();
                });
            });
            // add the new one
            $("body").append(nextGalleryModalHtml);
            // remove the currently displayed modal
            $(thisGalleryModalHtml).remove();
            // show the new one
            $(nextGalleryModalHtml).show();
        });

        // same as above but for previous button
        if ($(imgContainer).attr("position") == "first") {
            prevImgContainer = $("#imageGallery").find("div.gs-gallery-img-container[position='last']");
        } else {
            prevImgContainer = $(imgContainer).prev();
        }
        $(thisGalleryModalHtml).find("div.gs-gallery-modal-prev").click(function () {
            prevGalleryModalHtml = populateModal(prevImgContainer, $(galleryModalHtml).clone());
            $(prevGalleryModalHtml).find("div.gs-gallery-modal-close").click(function () {
                $(prevGalleryModalHtml).fadeOut(200, function () {
                    $(this).remove();
                });
            });
            $("body").append(prevGalleryModalHtml);
            $(thisGalleryModalHtml).remove();
            $(prevGalleryModalHtml).show();
        });

        // return the new html for use
        return thisGalleryModalHtml;
    };

    // on image container click
    $("div.gs-gallery-img-container").click(function () {
        // populate modal with image
        newModalHtml = populateModal(this, $(galleryModalHtml).clone());
        // add and show modal
        $("body").append(newModalHtml);
        $("#galleryModal1 div.gs-gallery-modal-close").click(function () {
            $(newModalHtml).fadeOut(200, function () {
                $(this).remove();
            });
        });
        $(newModalHtml).fadeIn(200);
    });
});