$(document).ready(function () {
      var baseHeight = $(document).height()-188;
    var baseWidth= $(document).width()-30;
   $("#botList").css("height", baseHeight);
    $(".chat-wrapper").css({"max-width":baseWidth, "max-height": baseHeight});
      
   });
window.addEventListener('resize', function () {  
      var baseHeight = $(document).height()-188;
    var baseWidth= $(document).width()-30;
     $("#botList").css("height", baseHeight);
    $(".chat-wrapper").css({"max-width":baseWidth, "max-height": baseHeight});
});

