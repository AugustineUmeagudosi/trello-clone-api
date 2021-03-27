var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

it('should display correct title', function() {

  var actualTitle = browser.getTitle();

  return expect(actualTitle).to.eventually.equal(expectedTitle);
});