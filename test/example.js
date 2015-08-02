var expect;

expect = require('chai').expect;

Feature('Counting', function() {
    return Scenario('Incrementing numbers', function() {
        Given('A number that starts at 0', function() {
            return this.n = 0;
        });
        When('the number is incremented', function() {
            return this.n++;
        });
        return Then('it becomes 1', function() {
            return expect(this.n).to.equal(1);
        });
    });
});