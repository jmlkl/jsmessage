function messageSystem() {
    this.messageMasterElement = undefined;
    this.messageClass = undefined;
    this.messageIdPrefix = undefined;
    this.messages = [];

    this.AddMessage = function( _msg, _dtime ) {
        let _time = Date.now();
        let _content = document.createTextNode( _msg );
        let _div = document.createElement("div");
       
        _div.appendChild( _content );
        _div.className = this.messageClass;
        _div.id = this.messageIdPrefix + _time;
        var _element = this.messageMasterElement.appendChild( _div );
        var _element = this.messageMasterElement.insertBefore(_div , this.messageMasterElement.childNodes[0] )    //insert to first (recent & old delete are then reversed!)
        if( _dtime == undefined ) { //easy fix that there is no need to look up array thru for elements that will be deleted via timeout
            this.messages.push( new messageContainer() );
            this.messages[this.messages.length-1].id = _div.id;
        }
        
        return _div.id;
    };
};

function messageContainer() {
    this.id = undefined;
    this.creationTime = Date.now();
};

function AddMessage( msgSystem, message = undefined, killTime = undefined ) {

    if( message == undefined ) message = "Hello!" + Date.now();
    var _id = msgSystem.AddMessage( message , killTime );

    if( killTime != undefined) {
        var _element = document.getElementById( _id );
        setTimeout( function() { _element.remove();} , killTime );

    }
}

function DeleteMessageOld(msgSystem) {

    var _data = msgSystem.messages.shift();
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        _element.remove();

    }
}

function DeleteMessageRecent(msgSystem) {

    var _data = msgSystem.messages.pop();
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        _element.remove();

    }
}
