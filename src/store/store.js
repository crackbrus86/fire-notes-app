
export const ProviderStore = {
    _handlers: [],
    _provider: 'firebase',
    onChange: function(handler){
        this._handlers.push(handler);
    },
    set: function(value){
        this._provider = value;
        this._handlers.forEach(handler => handler());
    },
    get: function(){
        return this._provider;
    }
}