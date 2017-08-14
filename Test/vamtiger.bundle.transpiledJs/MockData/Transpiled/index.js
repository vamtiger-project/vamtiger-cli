'use strict';

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function(value) {
                        step("next", value);
                    }, function(err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
    };
}

class Module {
    constructor() {
        this.name = 'ES2015 Module';
    }

    asyncFunction() {
        return _asyncToGenerator(function*() {
            const test = yield asyncTest();

            console.log(test);
        })();
    }

    asyncTest() {
        return new Promise((resolve, reject) => {
            resolve(2);
        });
    }
}

testInstance = new Module();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92YW10aWdlci9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvVmFtdGlnZXJQcm9qZWN0L3ZhbXRpZ2VyLWNsaS90ZXN0L3ZhbXRpZ2VyLmJ1bmRsZS50cmFuc3BpbGVkSnMvTW9ja0RhdGEvTW9kdWxlL2luZGV4LmpzIiwiL1VzZXJzL3ZhbXRpZ2VyL0RvY3VtZW50cy9Qcm9ncmFtbWluZy9WYW10aWdlclByb2plY3QvdmFtdGlnZXItY2xpL3Rlc3QvdmFtdGlnZXIuYnVuZGxlLnRyYW5zcGlsZWRKcy9Nb2NrRGF0YS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9ICdFUzIwMTUgTW9kdWxlJztcbiAgICB9XG5cbiAgICBhc3luYyBhc3luY0Z1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGVzdCA9IGF3YWl0IGFzeW5jVGVzdCgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuICAgIH1cblxuICAgIGFzeW5jVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKDIpKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFRlc3QgZnJvbSAnLi9Nb2R1bGUvaW5kZXguanMnO1xuXG50ZXN0SW5zdGFuY2UgPSBuZXcgVGVzdCgpOyJdLCJuYW1lcyI6WyJUZXN0Il0sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxBQUFNO0FBQ1IsQUFBVyxrQkFBRztBQUNWLEFBQUksYUFBQyxBQUFJLE9BQUcsQUFBZSxBQUFDO0FBQy9COztBQUVLLEFBQWEsQUFBQyxpQkFBcEI7QUFBdUI7QUFDbkIsa0JBQU0sQUFBSSxPQUFHLE1BQU0sQUFBUyxBQUFFLEFBQUM7O0FBRS9CLEFBQU8sb0JBQUMsQUFBRyxJQUFDLEFBQUksQUFBQyxBQUFDOztBQUNyQjs7QUFFRCxBQUFTLGdCQUFHO0FBQ1IsbUJBQVcsQUFBTyxRQUFDLENBQUMsQUFBTyxTQUFFLEFBQU0sV0FBSztBQUNwQyxBQUFPLG9CQUFFLEFBQUMsQUFBRTtBQUNmLEFBQUMsU0FGSztBQUdWLEFBQ0osQUFFRDtBQWxCYTs7QUNFYixBQUFZLGVBQUcsSUFBSSxBQUFJLEFBQUUifQ==