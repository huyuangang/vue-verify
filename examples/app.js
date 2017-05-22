

import Vue from 'vue';
import VueVerify from 'vue-verify';

Vue.use(VueVerify);

const verify = {
    phone: {
        rule: /^(13|14|15|17|18)\d{9}$/,
        tip: '请输入正确的手机号'
    },
    email: {
        rule: /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        tip: '输入正确的邮箱'
    },
    other: function (checkStr) {
        if (checkStr === '')
            return '此项不能为空';    
        return true;
    }
}

new Vue({
    el:'#app',
    data: {
        phone: '',
        email: 'haha',
        phoneTip: '',
        emailTip: '',
        show:false,
        list:['羽毛球'],
        haha: null,
        test: ''
    },
    verify
})