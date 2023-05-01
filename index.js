const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        lkeys: []        
    },

    eventHandlers: {
        oninput: function(currentValue) {
            textarea.value = currentValue;
        },
        onclose: null,        
    },

    properties: {
        value: "",
        capsLock: false,
        layout: "eng",
        layouts: {
            "eng": [
            ["`","Backquote"], ["1","Digit1"], ["2","Digit2"], ["3","Digit3"], ["4","Digit4"], ["5","Digit5"], ["6","Digit6"], ["7","Digit7"], ["8","Digit8"], ["9","Digit9"], ["0","Digit0"], ["-","Substract"], ["=","Equal"], ["backspace","Backspace"],
            ["Tab","Tab"], ["q", "KeyQ"], ["w","KeyW"], ["e","KeyE"], ["r","KeyR"], ["t","KeyT"], ["y","KeyY"], ["u","KeyU"], ["i","KeyI"], ["o","KeyO"], ["p","KeyP"], ["[","BracketLeft"], ["]","BracketRight"], ["Delete","Delete"],
            ["caps","CapsLock"], ["a","KeyA"], ["s","KeyS"], ["d","KeyD"], ["f","KeyF"], ["g","KeyG"], ["h","KeyH"], ["j","KeyJ"], ["k","KeyK"], ["l","KeyL"], [";","Simicolon"], ["'","Quote"], ["enter","Enter"],
            ["Shift","ShiftLeft"], ["z","KeyZ"], ["x","KeyX"], ["c","KeyC"], ["v","KeyV"], ["b","KeyB"], ["n","KeyN"], ["m","KeyM"], [",","Comma"], [".","Period"], ["?","Slash"], ["↑","ArrowUp"], ["Shift","ShiftRight"],
            ["Ctrl","ControlLeft"], ["Win","MetaLeft"], ["Alt","AltLeft"], ["space","Space"], ["Alt","AltRight"], ["Win","MetaRight"], ["←","ArrowLeft"], ["↓","ArrowDown"], ["→","ArrowRight"], ["Ctrl","ControlRight"]
            ],
            "rus": [
            ["ё","Backquote"], ["1","Digit1"], ["2","Digit2"], ["3","Digit3"], ["4","Digit4"], ["5","Digit5"], ["6","Digit6"], ["7","Digit7"], ["8","Digit8"], ["9","Digit9"], ["0","Digit0"], ["-","Substract"], ["=","Equal"], ["backspace","Backspace"],
            ["Tab","Tab"], ["й","KeyQ"], ["ц","KeyW"], ["у","KeyE"], ["к","KeyR"], ["е","KeyT"], ["н","KeyY"], ["г","KeyU"], ["ш","KeyI"], ["щ","KeyO"], ["з","KeyP"], ["х","BracketLeft"], ["ъ","BracketRight"], ["Delete","Delete"],
            ["caps","CapsLock"], ["ф","KeyA"], ["ы","KeyS"], ["в","KeyD"], ["а","KeyF"], ["п","KeyG"], ["р","KeyH"], ["о","KeyJ"], ["л","KeyK"], ["д","KeyL"], ["ж","Semicolon"], ["э","Quote"], ["enter","Enter"],
            ["Shift","ShiftLeft"], ["я","KeyZ"], ["ч","Keyx"], ["с","KeyC"], ["м","KeyV"], ["и","KeyB"], ["т","KeyN"], ["ь","KeyM"], ["б","Comma"], ["ю","Period"], ["?","Slash"], ["↑","ArrowUp"], ["Shift","ShiftRight"],
            ["Ctrl","ControlLeft"], ["Win","MetaLeft"], ["Alt","AltLeft"], ["space","Space"], ["Alt","AltRight"], ["Win","MetaRight"], ["←","ArrowLeft"], ["↓","ArrowDown"], ["→","ArrowRight"], ["Ctrl","ControlRight"]
            ]
        }
    },

    init() {
        let lt = storage.getItem("layout") ? storage.getItem("layout") : this.properties.layout;        
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys(this.properties.layouts[lt]));

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.lkeys = this.elements.keysContainer.querySelectorAll(".keyboard__key--letter");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);          

        var map = {};
        window.addEventListener("keydown", function(e){
            e = e || event; // to deal with IE
            map[e.code] = e.type == 'keydown';            
            if(map["ShiftLeft"] && map["ControlLeft"]){               
                this.properties.layout = this.properties.layout == "eng" ? "rus" : "eng";
                storage.layout = this.properties.layout;
                this._changeLayout(this.properties.layout);
                //map["ShiftLeft"] = false;
            }
        }.bind(this)); 

        window.addEventListener("keyup", function(e) {
            e = e || event; // to deal with IE
            map[e.code] = e.type == 'keydown';
        });

        this.setListener();
        
    },

    setListener() { 
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.lkeys = this.elements.keysContainer.querySelectorAll(".keyboard__key--letter");
        var th = this;  
        window.onkeydown = function(e){
            //textarea.focus();
            e.preventDefault();            
            th.elements.keys.forEach(function(key){
                if(key.getAttribute("code") == e.code){                     
                    key.click();
                    key.classList.add("keyboard__key--active");
                }
            });               
        };

        window.onkeyup = function(e) {            
            th.elements.keys.forEach(function(key){
                if(key.getAttribute("code") == e.code){                    
                    key.classList.remove("keyboard__key--active");
                }
            });   
        };
        /*function keydownHandler(e) {
            e.preventDefault();            
            this.elements.keys.forEach(function(key){
                if(key.getAttribute("code") == e.code){                     
                    key.click();
                    key.classList.add("keyboard__key--active");
                }
            });    
        }

        function keyupHandler(e) {
            this.elements.keys.forEach(function(key){
                if(key.getAttribute("code") == e.code){                    
                    key.classList.remove("keyboard__key--active");
                }
            }); 
        }*/        
        //window.addEventListener("keydown", this.eventHandlers.onkeydown.bind(this));
        //window.addEventListener("keyup", this.eventHandlers.onkeyup.bind(this));
    },

    removeListener() {
        window.onkeydown = null;
        window.onkeyup =null;        
        //window.removeEventListener("keydown", this.eventHandlers.onkeydown.bind(this));
        //window.removeEventListener("keyup", this.eventHandlers.onkeyup.bind(this));
    },

    _createKeys(lout) {
        const fragment = document.createDocumentFragment();        

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        lout.forEach((key,ind) => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "Del", "enter"].indexOf(key[0]) !== -1 || ind == 53;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.setAttribute("code", key[1]);
            keyElement.classList.add("keyboard__key");

            switch (key[0]) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");  
                    keyElement.addEventListener("click", () => {
                        this.properties.value = textarea.value.substring(0,textarea.selectionStart-1) + textarea.value.substring(textarea.selectionStart);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");                   

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");                    

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");                    

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;               

                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    //keyElement.setAttribute("code", "ShiftLeft");
                    keyElement.textContent = key[0];
                    break;

                case "Ctrl":
                    keyElement.textContent = key[0];
                   
                    break;

                case "Alt":
                    keyElement.textContent = key[0];
                    //keyElement.setAttribute("code", "AltLeft");                    
                    break;

                case "Win":
                    keyElement.textContent = key[0];
                    //keyElement.setAttribute("code", "MetaLeft");
                    break;

                case "Tab":
                    keyElement.textContent = key[0];
                    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });
                    break;

                case "Delete":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key[0];
                    //keyElement.setAttribute("code", "Delete");
                    keyElement.addEventListener("click", (e) => {
                        this.properties.value = textarea.value.substring(0,textarea.selectionStart) + textarea.value.substring(textarea.selectionStart+1);
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key[0].toLowerCase();
                    keyElement.classList.add("keyboard__key");
                    keyElement.classList.add("keyboard__key--letter");                                 

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key[0].toUpperCase() : key[0].toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }            
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {        
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.lkeys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _changeLayout(lt) {        
            this.elements.keysContainer.innerHTML = "";
            this.elements.keysContainer.appendChild(this._createKeys(this.properties.layouts[lt]));            
            this.removeListener();
            this.setListener();
            //return false;                  
    },
    
};
var storage = window.localStorage;
var message = document.createElement("p");
message.textContent = "Windows";
document.body.appendChild(message);
message = document.createElement("p");
message.textContent = "Use left shift + left ctrl to change layout";
document.body.appendChild(message);
const textarea = document.createElement("textarea");
textarea.classList.add("use-keyboard-input");

document.body.appendChild(textarea);

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
