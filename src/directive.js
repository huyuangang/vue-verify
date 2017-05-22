
var vue,   //vue实例
    vObj;  //触发条件



export default {
    // bind(el, binding, vnode) {
    //     currentNode = {
    //         className: el.className,
    //         id: el.id
    //     }
    // },
    inserted(el, binding, vnode) {
        vue = vnode.context;
        vObj = vue.$verify;
        //获取前一个dom节点
        var preNode = vnode.elm.previousElementSibling;
        //获取父亲节点
        var parentNode = vnode.elm.parentNode;

        if (preNode.tagName.toUpperCase() !== 'INPUT') {
            parentNode.removeChild(el);
            return;
        }
        //获取该dom的子节点。
        var c = vnode.elm.children;
        var children = {
            success: {
                innerHTML: '',
                className: '',
                id: ''
            },
            error: {
                innerHTML: '',
                className: '',
                id: ''
            }
        }
        for (var i = 0, l = c.length; i < l; i++) {
            if (c[i].dataset.verify === 'true') {
                children.success = {
                    id: c[i].id,
                    className: c[i].className,
                    tagName: c[i].tagName,
                    innerHTML: c[i].innerHTML
                }
            }
            else {
                children.error = {
                    id: c[i].id,
                    className: c[i].className,
                    tagName: c[i].tagName,
                    innerHTML: c[i].innerHTML
                }
            }
        }
        el.innerHTML = '';
        if (!binding.arg)
            return;
        var rules = binding.arg.split(':');
        var m = Object.keys(binding.modifiers);
        var triggers = m.length === 0 ? ['blur'] : m;
        addEvent(preNode, el, triggers, children, rules);
    }
}


function addEvent(preEl, el, triggers, children, rules) {
    triggers.forEach((t) => {
        if (t === 'blur') {
            addHandler(preEl, t, el, children, rules);
        } else if (t === 'focus') {
            addHandler(preEl, t, el, children, rules);
        } else if (t === 'change') {
            addHandler(preEl, t, el, children, rules);
        } else if (t === 'keydown') {
            addHandler(preEl, t, el, children, rules);
        } else if (t === 'keyup') {
            addHandler(preEl, t, el, children, rules);
        }
    })
}

function addHandler(preEl, type, el, children, rules) {
    let handler = preEl['on' + type];
    preEl.addEventListener(type, function () {
        if (typeof handler === 'function')
            handler();
        let result = check(preEl, rules);
        if (result === true) {
            el.innerHTML = children.success.innerHTML;
            el.className = children.success.className;
            el.id = children.success.id;
        }
        else {
            let s = children.error.innerHTML;
            if (s.indexOf('{%error%}'))
                s = s.replace('{%error%}', result);
            el.innerHTML = s;
            el.className = children.error.className;
            el.id = children.error.id;
        }
    })
}



function check(el, rules) {
    var checkStr = el.value,
        p = true;
    for (let i = 0, l = rules.length; i < l; i++) {
        let r = rules[i];
        if (!vObj[r])
            continue;
        if (typeof vObj[r] === 'function') {
            p = vObj[r](checkStr);
            if (p === true) {
                continue;
            }
            else {
                break;
            }
        }
        if (!vObj[r].rule) {
            continue;
        }
        if (!vObj[r].rule.test(checkStr)) {
            p = vObj[r].tip || '验证失败';
            break;
        }
    }
    return p;
}