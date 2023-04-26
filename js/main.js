// If you don't want the particles, change the following to false
const doParticles = 1;




// Do not mess with the rest of this file unless you know what you're doing

const getWidth = () => { // credit to travis on stack overflow
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};

if (doParticles) {
    if (getWidth() < 400) $.firefly({
        minPixel: 1,
        maxPixel: 2,
        total: 20
    });
    else $.firefly({
        minPixel: 1,
        maxPixel: 3,
        total: 70
    });
}

// This is for the click to copy
let t;
$(document).ready(() => {
    t = $(".ip").html();
});

$(document).on("click", ".ip", () => {
    let copy = document.createElement("textarea");
    copy.style.position = "absolute";
    copy.style.left = "-99999px";
    copy.style.top = "0";
    copy.setAttribute("id", "ta");
    document.body.appendChild(copy);
    copy.textContent = t;
    copy.select();
    document.execCommand("copy");
    $(".ip").html("<span class='extrapad'>IP copied!</span>");
    setTimeout(() => {
        $(".ip").html(t);
        var copy = document.getElementById("ta");
        copy.parentNode.removeChild(copy);
    }, 500);
});

// This is to fetch the player count
$(document).ready(() => {
    let ip = $(".sip").attr("data-ip");
    let port = $(".sip").attr("data-port");
    if (port == "" || port == null) port = "25565";
    if (ip == "" || ip == null) return console.error("Error fetching player count ");
    updatePlayercount(ip, port);
    // Updates every minute (not worth changing due to API cache)
    setInterval(() => {
        updatePlayercount(ip, port);
    }, 10000);
});

const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`, (result) => {
        if (result.hasOwnProperty('Server is Online')) {
            $(".sip").html(result.online);
        } else {
            $(".playercount").html("Server is Offline!");
        }
    });
};