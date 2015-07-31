/*
 * haozi crate
 *
 * */
var s = {
    sethost: function (a) {
        this.host = a
    },
    init: function () {
        this.socket = new io.connect(this.host);
        this.socket.on('connect', function () {
            alert('成功连接socket.io.');
        });
        this.socket.on('exit', function (date) {

        });
        this.socket.on('msg', function (date) {
            console.log(date.msg);
            switch (date.type) {
                case 'join':
                    if (renwu.length == 0) {
                        renwu.push(date.msg);
                        break;
                    }
                    else {
                        for (var i = 0; i < renwu.length; i++) {
                            if (renwu[i].name != date.msg.name) {
                                renwu.push(date.msg);
                            }
                        }
                    }
                    this.send("join", renwu[0]);
                    break;
                case 'exit':
                    break;
                case 'move':
                    for (var i = 0; i < renwu.length; i++) {

                        if (renwu[i].name == date.msg.name) {
                            move(date.msg.keyCode, i);
                            break;
                        }
                    }
                    break;
                case 'zidan':

                    for (var i = 0; i < renwu.length; i++) {

                        if (renwu[i].UID == date.msg.UID) {
                            zidan.push(date.msg);
                            break;
                        }
                    }
                    break;
            }
        });

        this.socket.on('move', function (data) {
            //for(var i=0;i<renwu.length;i++)
            //{
            //    if(renwu[i].name==date.name)
            //    {
            //
            //    }
            //}
        })
    },
    send: function (type, msg) {
        this.socket.emit("message", {"type": type, "msg": msg});
    }
}