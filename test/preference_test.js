const preference = require("../static/preference.js");
const expect = require("chai").expect;

describe("Checks if the send function is sending the correct url on the preference page", function() {
   it("Should be /update/major/compsci/population/<10000/distance/in/sociallife/near/demographic/HBCU/graduationrate/<70/satoract/Both/gpa/>3.0", function () {
       expect(preference.send('compsci', '<10000', 'in', 'near', 'HBCU', '<70', 'Both', '>3.0')).to.equal("/update/major/compsci/population/<10000/distance/in/sociallife/near/demographic/HBCU/graduationrate/<70/satoract/Both/gpa/>3.0");
   });
});