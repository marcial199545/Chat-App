jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");

jQuery("#profile-img").click(function() {
    jQuery("#status-options").toggleClass("active");
});

jQuery(".expand-button").click(function() {
    jQuery("#profile").toggleClass("expanded");
    jQuery("#contacts").toggleClass("expanded");
});

jQuery("#status-options ul li").click(function() {
    jQuery("#profile-img").removeClass();
    jQuery("#status-online").removeClass("active");
    jQuery("#status-away").removeClass("active");
    jQuery("#status-busy").removeClass("active");
    jQuery("#status-offline").removeClass("active");
    jQuery(this).addClass("active");

    if (jQuery("#status-online").hasClass("active")) {
        jQuery("#profile-img").addClass("online");
    } else if (jQuery("#status-away").hasClass("active")) {
        jQuery("#profile-img").addClass("away");
    } else if (jQuery("#status-busy").hasClass("active")) {
        jQuery("#profile-img").addClass("busy");
    } else if (jQuery("#status-offline").hasClass("active")) {
        jQuery("#profile-img").addClass("offline");
    } else {
        jQuery("#profile-img").removeClass();
    }

    jQuery("#status-options").removeClass("active");
});

function newMessage() {
    message = jQuery(".message-input input").val();
    if (jQuery.trim(message) == "") {
        return false;
    }
    jQuery('<li class="sent"><img src="/icon/userDefaultimage.png" alt="" /><p>' + message + "</p></li>").appendTo(jQuery(".messages ul"));
    jQuery(".message-input input").val(null);
    jQuery(".contact.active .preview").html("<span>You: </span>" + message);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
}

jQuery(".submit").click(function() {
    newMessage();
});

jQuery(window).on("keydown", function(e) {
    if (e.which == 13) {
        newMessage();
        return false;
    }
});
