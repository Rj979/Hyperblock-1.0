// If you don't want the particles, change the following to false
const doParticles = true;

// Do not mess with the rest of this file unless you know what you're doing

const getWidth = () => {
    // credit to Travis on Stack Overflow
    // https://stackoverflow.com/a/11744120/10022190
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};

$(document).ready(() => {
    if (doParticles) {
        if (getWidth() < 400) {
            $.firefly({
                minPixel: 1,
                maxPixel: 2,
                total: 20
            });
        } else {
            $.firefly({
                minPixel: 1,
                maxPixel: 3,
                total: 70
            });
        }
    }

    let t = $(".ip").html();

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

    let ip = $(".sip").attr("data-ip");
    let port = $(".sip").attr("data-port") || "25565";
    if (ip == "" || ip == null) {
        console.error("Error fetching player count: missing IP");
        return;
    }
    updatePlayercount(ip, port);
    // Updates every 60 seconds
    setInterval(() => {
        updatePlayercount(ip, port);
    }, 60000);
});

const updatePlayercount = (ip, port) => {
    $.get(`https://api.bybilly.uk/api/players/${ip}/${port}`)
    .done((result) => {
        if (result.hasOwnProperty('online')) {
            $(".sip").html(result.online);
        } else {
            $(".playercount").html("Server is offline!");
        }
    })
    .fail(() => {
        $(".playercount").html("Error fetching player count: API error");
    });
};
