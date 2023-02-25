var EventTrigger = function() {

    var _listeners = [];

    var _trigger = function(prms) {
        if (_listeners) {
            _listeners.forEach(function(listener) {
                listener(prms);
            });
        }
    };

    var _listen = function(listener) {

        _listeners.push(listener);
    }

    return {
        trigger: _trigger,
        listen: _listen
    };
};
