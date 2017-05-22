
import directive from './directive.js'
import mixin from './mixin.js'

var VueVerify = {
    install : function (Vue) {
        Vue.mixin(mixin);
        Vue.directive('verify', directive);
    }
}

export default VueVerify;