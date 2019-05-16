const socket = window.io();
const form = jQuery("#message-form");
const geoButton = jQuery("#send-location");

socket.on("connect", function() {
    console.log("connected to server");
});
socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

form.on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", { from: "User", text: jQuery("[name=message]").val() }, function(data) {
        console.log("ACKOWNLEDGE ==> Got it", data);
    });
    form.trigger("reset");
});
geoButton.on("click", function(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
        function(position) {
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        function() {
            alert("unable to geolocate");
        }
    );
});

socket.on("newSentMessage", function(message) {
    if (jQuery.trim(message.text) == "") {
        return false;
    }
    jQuery(`<li class="sent"><img src="/icon/userDefaultimage.png" alt="" /><p> ${message.from}: ${message.text}</p></li>`).appendTo(
        jQuery(".messages ul")
    );
    jQuery(".contact.active .preview").html(`You: ${message.text}`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
socket.on("newRecieveMessage", function(message) {
    if (jQuery.trim(message.text) == "") {
        return false;
    }
    jQuery(`<li class="replies"><img src="/icon/userDefaultimage.png" alt="" /><p> ${message.from}: ${message.text}</p></li>`).appendTo(
        jQuery(".messages ul")
    );
    jQuery(".contact.active .preview").html(message.text);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
socket.on("newSentLocationMessage", function(message) {
    jQuery(
        `<li class="sent"><img src="/icon/userDefaultimage.png" alt="" /><p><a target="_blank" href ="${message.url}">${
            message.from
        }: Go to your location</a></p></li>`
    ).appendTo(jQuery(".messages ul"));
    jQuery(".contact.active .preview").html(`You: Go to location`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});

socket.on("newRecieveLocationMessage", function(message) {
    jQuery(
        `<li class="replies"><img src="/icon/userDefaultimage.png" alt="" /><p><a target="_blank" href ="${message.url}">${
            message.from
        }: Go to your location</a></p></li>`
    ).appendTo(jQuery(".messages ul"));
    jQuery(".contact.active .preview").html(`Go to location`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
