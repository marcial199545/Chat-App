const socket = window.io();
const messageForm = jQuery("#message-form");
const joinForm = jQuery("#join-form");
const geoButton = jQuery("#send-location");
socket.on("connect", function() {
    let params = jQuery.deparam(window.location.search);
    if (params.name != undefined || params.room != undefined) {
        socket.emit("join", params, function(err) {
            if (err) {
                alert(err);
                window.location.href = "/";
            }
        });
    }
});
socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
    console.log("TCL: users", users);
    let contactList = jQuery("#contacts ul");
    contactList.empty();
    users.forEach(function(user) {
        contactList.append(
            jQuery(
                `<li class='contact'><div class="wrap"><span class="contact-status online" /><img src="/icon/userDefaultImage.png" alt="" /><div class="meta"><p class="name">${user}</p></div></div></li>`
            )
        );
    });
    // contactList.empty();
    jQuery("#contacts").html(contactList);
});
socket.on("updateCurrentUser", function(currentUser) {
    console.log("TCL: currentUser", currentUser);
    let userName = jQuery("#userName");
    let roomName = jQuery(".contact-profile p");
    roomName.text(`Room: ${currentUser.room}`);
    userName.text(`${currentUser.name}`);
});
messageForm.on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", { from: "User", text: jQuery("[name=message]").val() }, function(data) {
        console.log("ACKOWNLEDGE ==> Got it", data);
    });
    messageForm.trigger("reset");
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
    let formatedTime = moment(message.createdAt).format("h:mm a");
    jQuery(`<li class="sent"><img src="/icon/userDefaultImage.png" alt="" /><p>  ${message.from} ${formatedTime}: ${message.text}</p></li>`).appendTo(
        jQuery(".messages ul")
    );
    jQuery(".contact.active .preview").html(`You: ${message.text}`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
socket.on("newRecieveMessage", function(message) {
    if (jQuery.trim(message.text) == "") {
        return false;
    }
    let formatedTime = moment(message.createdAt).format("h:mm a");
    jQuery(
        `<li class="replies"><img src="/icon/userDefaultImage.png" alt="" /><p>  ${message.from} ${formatedTime}: ${message.text}</p></li>`
    ).appendTo(jQuery(".messages ul"));
    jQuery(".contact.active .preview").html(message.text);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
socket.on("newSentLocationMessage", function(message) {
    let formatedTime = moment(message.createdAt).format("h:mm a");
    jQuery(
        `<li class="sent"><img src="/icon/userDefaultImage.png" alt="" /><p><a target="_blank" href ="${message.url}">${
            message.from
        } ${formatedTime}: Go to your location</a></p></li>`
    ).appendTo(jQuery(".messages ul"));
    jQuery(".contact.active .preview").html(`You: Go to location`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});

socket.on("newRecieveLocationMessage", function(message) {
    let formatedTime = moment(message.createdAt).format("h:mm a");
    jQuery(
        `<li class="replies"><img src="/icon/userDefaultImage.png" alt="" /><p><a target="_blank" href ="${message.url}">${
            message.from
        } ${formatedTime}: Go to location</a></p></li>`
    ).appendTo(jQuery(".messages ul"));
    jQuery(".contact.active .preview").html(`Go to location`);
    jQuery(".messages").animate({ scrollTop: jQuery(document).height() }, "fast");
});
