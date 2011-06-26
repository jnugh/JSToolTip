/*Settings*/
var tooltipHeight = 130;
var tooltipWidth = 130;/*Both px values*/

var preferedTooltipTopPosition = 1; /*1=top, 2=bottom*/
var preferedTooltipLeftPosition = 1; /*1=left, 2=right*/

var timeTillDisplay = 600;
var timeTillHide = 400;

var rightLeftOffset = 10;

var tooltipTimeout = null;
var tooltipElement = null;
$(document).ready(function (){
    function displayTooltipTop(topToWhat, trySpace){
        pos = $(topToWhat).offset();
        if((pos.top - tooltipHeight) < 0){
            if(trySpace)
                return displayTooltipBottom(topToWhat, false);
        }
        $("#tooltipContainer").css("top", pos.top - tooltipHeight);
    }
    function displayTooltipBottom(bottomToWhat, trySpace){
        pos = $(bottomToWhat).offset();
        if((pos.top + $(bottomToWhat).height() + tooltipHeight) > $(document).height()){
            if(trySpace)
                return displayTooltipTop(bottomToWhat, false);
        }
        $("#tooltipContainer").css("top", pos.top+$(bottomToWhat).height());
    }
    function displayTooltipLeft(leftToWhat, trySpace){
        pos = $(leftToWhat).offset();
        if((pos.left - rightLeftOffset) < 0){
            if(trySpace)
                return displayTooltipRight(leftToWhat, false);
        }
        $("#tooltipContainer").css("left", pos.left - rightLeftOffset);
    }
    function displayTooltipRight(rightToWhat, trySpace){
        pos = $(rightToWhat).offset();
        if((pos.left + rightLeftOffset + tooltipWidth) > $(document).width()){
            if(trySpace)
                return displayTooltipLeft(rightToWhat, false);
        }
        $("#tooltipContainer").css("left", pos.left+rightLeftOffset);
    }
    $(".tooltipLink").each(function(){
        $(this).mouseover(function(){
            clearTimeout(tooltipTimeout);
            tooltipElement = this;
            tooltipTimeout = setTimeout(function(){
                $("#tooltipContainer").html($($(tooltipElement).children(".toolTipContent")[0]).html());
                $("#tooltipContainer").width(tooltipWidth);
                $("#tooltipContainer").height(tooltipHeight);
                if(preferedTooltipTopPosition == 1){
                    displayTooltipTop(tooltipElement, true);
                } else {
                    displayTooltipBottom(tooltipElement, true);
                }
                if(preferedTooltipLeftPosition == 1){
                    displayTooltipLeft(tooltipElement, true);
                } else {
                    displayTooltipRight(tooltipElement, true);
                }
                $("#tooltipContainer").show();
            }, timeTillDisplay);
        });
        $(this).mouseout(function(){
            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(function(){
                $("#tooltipContainer").hide();
            }, timeTillHide);
        });
    });
    $("#tooltipContainer").mouseover(function(){
        clearTimeout(tooltipTimeout);
    }).mouseout(function(){
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(function(){
            $("#tooltipContainer").hide();
        }, timeTillHide);
    });
});