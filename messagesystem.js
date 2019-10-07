function messageSystem() {
    this.messageMasterElement = undefined; //document.getElementById("messageAreaDemo")
    this.messageClass = undefined;   //"message"
    this.messageIdPrefix = undefined;    //"message"
    this.messages = [];

    this.AddMessage = function( _msg ) {
        let _time = Date.now();
        let _content = document.createTextNode( _msg );
        let _div = document.createElement("div");

        _div.appendChild( _content );
        _div.className = this.messageClass;
        _div.id = this.messageIdPrefix + _time;

        var _element = this.messageMasterElement.appendChild( _div );
        var _element = this.messageMasterElement.insertBefore(_div , this.messageMasterElement.childNodes[0] )    //insert to first (recent & old delete are then reversed!)
        this.messages.push( new messageContainer() );
        this.messages[this.messages.length-1].id = _div.id;
        
        return _div.id;
    };
    this.DeleteRecentMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[ this.messageMasterElement.childNodes.length-1] )
    };
    this.DeleteOldMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[0] )
    };
    
    this.DeleteMessage = function () {
        //if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[0] )
    };
};

function messageContainer() {
    this.id = undefined;
    this.creationTime = Date.now();
};

function container( g ) {
    this.id = undefined;
    this.creationTime = 11122;
    this.d = g;
};

var msgSys = new messageSystem();

msgSys.messageMasterElement = document.getElementById("messageAreaDemo");
msgSys.messageClass = "message";
msgSys.messageIdPrefix = "message";
msgSys.messages = [];



function AddMessage( msgSystem ) {

    msgSystem.AddMessage("Hello!" + Date.now() );
    console.log( msgSystem.messages[ msgSystem.messages.length -1].id );
}

function DeleteMessageOld(msgSystem) {

    var _data = msgSystem.messages.shift();
    console.log( _data );
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        _element.remove();

    }
}

function DeleteMessageRecent(msgSystem) {

    var _data = msgSystem.messages.pop();
    console.log( _data );
    if( _data != undefined ) {
        var _element = document.getElementById( _data.id );
        _element.remove();

    }
}

function DebugReport() {

    let str = "";
    msgSys.messages.forEach(element => {
        str += JSON.stringify( element );
    });

    document.getElementById("debugLog").innerHTML = str;

}