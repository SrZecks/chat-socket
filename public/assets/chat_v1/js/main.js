
function bot_msg() {
    setTimeout(function () {
        var last = $('.span_text').last().text();
        var last_msg = last.toLowerCase();

        switch (last_msg) {
            case "local":
                msg = "Em algum lugar daora ai"
                break;
            case "produtos":
                msg = "Ainda não vendemos nenhum"
                break;
            case "preços":
                msg = "Todos os meus produtos são grátis"
                break;
            case "qual seu nome?":
                msg = "não tenho nome ainda"
                break;
            case "ajuda":
                msg = "Opções disponiveis: <br> Local <br> Produtos <br> Preços"
                break;
            default:
                msg = "Não entendi, digite ajuda para ver as opções."

        }

        if ($('#chat').children().last().attr('class').includes('user_msg') || $('#chat').children().last().attr('class').includes('user_msg_ac')) {
            var time = new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            });

            var new_msg = "<div class='robot_msg w3-display-container w3-card scale-in-left'>"
                + msg + "<div class='hour w3-display-bottomright'>" + time + "</div></div>";

            var old_msg = "<div class='robot_msg_ac w3-display-container w3-card scale-in-left'>"
                + msg + "<div class='hour w3-display-bottomright'>" + time + "</div></div>";

            if ($('#chat').children().length > 0) {
                if ($('#chat').children().last().attr('class').includes('robot_msg')) {
                    $('#chat').append(old_msg);
                    $('#chat').scrollTo($('#chat').children().last());

                } else if ($('#chat').children().last().attr('class').includes('robot_msg_ac')) {
                    $('#chat').append(new_msg);
                    $('#chat').scrollTo($('#chat').children().last());
                }
                else {
                    $('#chat').append(new_msg);
                    $('#chat').scrollTo($('#chat').children().last());
                }
            } else {
                $('#chat').append(new_msg);
                $('#chat').scrollTo($('#chat').children().last());
            }
        }
        else {
            //Nothing
        }

    }, 2000);
}

$('#msg_input').keyup(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        send_msg();
        bot_msg();
    }

});

$('#msg_btn').click(function () {
    send_msg();
    bot_msg();
});