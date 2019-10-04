function messageSystem() {
    var messageMasterElement = undefined; //document.getElementById("messageAreaDemo")
    var messageClass = undefined;   //"message"
    var messageIdPrefix = undefined;    //"message"
    //var messages = [];

    this.AddMessage = function( _msg ) {
        let _time = Date.now();
        let _content = document.createTextNode( _msg );
        let _div = document.createElement("div");

        _div.appendChild( _content );
        _div.className = this.messageClass;
        _div.id = this.messageIdPrefix + _time;

        var _element = this.messageMasterElement.appendChild( _div );
    };
    this.DeleteRecentMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[ this.messageMasterElement.childNodes.length-1] )
    };
    this.DeleteOldMessage = function (){
        if( this.messageMasterElement.childNodes.length > 0 ) this.messageMasterElement.removeChild( this.messageMasterElement.childNodes[0] )
    };
};

var msgSys = new messageSystem();

msgSys.messageMasterElement = document.getElementById("messageAreaDemo");
msgSys.messageClass = "message";
msgSys.messageIdPrefix = "message";



function AddMessage() {
    msgSys.AddMessage("Hello!" + Date.now() );
}

function DeleteMessageOld() {
    msgSys.DeleteOldMessage();
}

function DeleteMessageRecent() {
    msgSys.DeleteRecentMessage();
}