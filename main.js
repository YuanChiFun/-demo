window.onload = function() {
    var container = document.getElementById("container");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var list = document.getElementById("list");
    var buttons = document.getElementsByTagName("span");
    var index = 1;
    var animated = false;
    var timer; //做一个优化

    function showButton() {
        if (index == 6) //如果不判断，index会一直加。
            index = 1;
        else if (index == 0)
            index = 5;
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className === 'on')
                buttons[i].className = '';
        }
        buttons[index - 1].className = 'on';
    };

    function animate(offset) {
        animated = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 500; //总时间;
        var interval = 10; //位移间隔时间;
        var speed = offset / (time / interval); //每次移动量;


        function go() {
            if (speed < 0 && parseInt(list.style.left) > newLeft || (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval); //再次调用，看是否满足条件；递归
            } else {
                animated = false;
                list.style.left = newLeft + 'px';
                if (newLeft > -467)
                    list.style.left = -467 * 5 + 'px';
                if (newLeft < -467 * 5)
                    list.style.left = -467 + 'px';
            }
        }
        go();
    }

    next.onclick = function() {
        index += 1;
        showButton();
        if (!animated) {
            animate(-467);
        }
    };

    prev.onclick = function() {
        index -= 1;
        showButton();
        if (!animated) {
            animate(467);
        }
    };

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onmouseover = function() {
            if (this.className == 'on')
                return; //优化处理，当鼠标移动到同一个元素上，不会执行函数；
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = (-467 * (myIndex - index));
            index = myIndex;
            showButton();
            if (!animated) {
                animate(offset);
            }
        }
    };

    function change() {
        timer = setInterval(function() { //可以一直执行；
            next.onclick();
        }, 3000);
    };

    function stop() {
        clearInterval(timer); //清除
    };

    container.onmouseover = stop;
    container.onmouseout = change;

    change();
}