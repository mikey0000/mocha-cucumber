var Base, Spec, exports, mocha;

mocha = require('mocha');

Base = mocha.reporters.Base;

Spec = function(runner) {
    var color, cursor, indent, indents, n, self, stats;
    indent = function() {
        return Array(indents).join("  ");
    };
    Base.call(this, runner);
    self = this;
    stats = this.stats;
    indents = 0;
    n = 0;
    cursor = Base.cursor;
    color = Base.color;

    runner.on("start", function() {
        return console.log();
    });


    runner.on("suite", function(suite) {
        ++indents;
        return console.log(color("suite", "%s%s: %s"), indent(), suite.name || '', suite.title);
    });

    runner.on("suite end", function(suite) {
        --indents;
        if (1 === indents) {
            return console.log();
        }
    });

    runner.on("pending", function(test) {
        var fmt;
        fmt = indent() + color("pending", "  - %s %s");
        return console.log(fmt, test.name || '', test.title);
    });

    runner.on("pass", function(test) {
        var fmt;
        if ("fast" === test.speed) {
            fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("bright pass", " %s %s ");
            cursor.CR();
            return console.log(fmt, test.name || '', test.title);
        } else {
            fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s %s ") + color(test.speed, "(%dms)");
            cursor.CR();
            return console.log(fmt, test.name || '', test.title, test.duration);
        }
    });

    runner.on("fail", function(test, err) {
        cursor.CR();
        return console.log(indent() + color("fail", "  %d) %s %s"), ++n, test.name || '', test.title);
    });
    return runner.on("end", self.epilogue.bind(self));
};

Spec.prototype.__proto__ = Base.prototype;

exports = module.exports = Spec;
