//  NOTE animate to bottom
jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");

//  NOTE show status options
jQuery("#profile-img").click(function() {
    jQuery("#status-options").toggleClass("active");
});

jQuery(".expand-button").click(function() {
    jQuery("#profile").toggleClass("expanded");
    jQuery("#contacts").toggleClass("expanded");
});
// NOTE status change
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
jQuery("#contacts ul li").click(function() {
    jQuery(".contact").removeClass("active");
    jQuery(this).addClass("active");
});
