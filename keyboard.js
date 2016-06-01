var gWindowHeight = $(window).height();
var gWindowWidth = $(window).width();

var KeyBoard = function(container){
	this.init(container);
}
KeyBoard.prototype = {
    letterList:[
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ],
    init:function(container){
        this.container = container;
        this.appendElement();
        this.appendLetterBar();
        this.appendLetter();
        this.addLetterClickEvent();
    },
    appendElement:function(){
		var thisHtml = "<div id='keyBoard' class='keyBoard'></div>";
    	this.container.append(thisHtml);
    	this.element = $("#keyBoard");
    },
    appendLetterBar:function(){
    	this.element.append("<div id='letter-bar' class='letter-line letter-bar'></div>");
    	this.letterBar = $("#letter-bar");
    },
    appendLetter:function(){
        var self = this;
        console.log(self.container);
        this.letterList.forEach(function(line,index){
            var letterHtml = "<div id='letter-line-" + index + "' class='letter-line'></div>";
            self.element.append(letterHtml);
            line.forEach(function(letter){
                $("#letter-line-" + index).append("<span class='letter'>" + letter + "</span>");
            });
            $('.letter').outerWidth($(window).width()/10,true);
            window.onresize = function(){
                $('.letter').outerWidth($(window).width()/10,true);
            };
            if(index == 2){
            	$("#letter-line-" + index).append("<span id='letter-del' class='letter-del'>Del</span>");
            }
        });

        this.letterDel = $("#letter-del");
        this.element.append("<div id='letter-line-3' class='letter-line'></div>");

        $("#letter-line-3").append('<span id="letter-space" class="letter-space"></span><span id="letter-ok" class="letter-ok">完成</span>');
        this.letterSpace = $("#letter-space");
        this.letterOk = $("#letter-ok");
    },
    addLetterClickEvent:function(){
    	console.log($(".letter-line").children(".letter"));
    	var self = this;
    	$(".letter-line").children(".letter").map(function(){
    		$(this).on("click",function(){
    			var oldText = self.letterBar.text();
    			var tempText = oldText.split("");
    			tempText.push($(this).text());
    			var newText = tempText.join("");
    			self.letterBar.text(newText);
    		})
    	})
    	this.letterSpace.on("click",function(){
    		var oldText = self.letterBar.text();
			var tempText = oldText.split("");
			if(tempText[tempText.length-1]!=" "){
				tempText.push(" ");
			}
			var newText = tempText.join("");
			self.letterBar.text(newText);
    	})

    	this.letterDel.on("click",function(){
    		var oldText = self.letterBar.text();
			var tempText = oldText.split("");
			tempText.pop();
			var newText = tempText.join("");
			self.letterBar.text(newText);
    	})

    	this.letterOk.on("click",function(){
    		console.log(self.letterBar.text().trim());
    		self.element.css({
    			"top":"-100%"
    		})
    	})
    }
}

$(function(){
	var keyBoard = new KeyBoard($("#test"));
})