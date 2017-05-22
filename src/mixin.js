
var verifyObj = {
    
}

function resetVerify(vObj) {
    let keys = Object.keys(vObj);
    keys.forEach((key) => {
        verifyObj[key] = verifyObj[key] || vObj[key];
    })
}

export default {
    beforeCreate() {
        var vObj = this.$options.verify;
        if (vObj && typeof vObj === 'object') {
            resetVerify(vObj);
            this.$verify = verifyObj;
        }
    }
}