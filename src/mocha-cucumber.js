var mocha, reporter;

mocha = require('mocha');

module.exports = function(suite) {

    mocha.interfaces.bdd(suite);

    return suite.on("pre-require", function(context, file, mocha) {
        var clause, fn1, fn2, ref, ref1;
        ref = ['Feature', 'Scenario'];

        fn1 = function(clause) {
            return context[clause] = function(title, fn) {
                suite = context.describe(title, fn);
                suite.name = clause;
                return suite;
            };
        };

        var len = ref.length;
        for (var i = 0; i < len; i++) {
            clause = ref[i];
            fn1(clause);
        }

        ref1 = ['Given', 'When', 'Then', 'And', 'But'];

        fn2 = function(clause) {
            return context[clause] = function(title, fn) {
                var test;
                test = context.it(title, fn);
                test.name = clause;
                return test;
            };
        };

        var len1 = ref1.length;
        for (var j = 0; j < len1; j++) {
            clause = ref1[j];
            fn2(clause);
        }
    });
};