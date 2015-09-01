 $(document).ready(function(){

  $(".sliderBox").click(function() {
    $(this).animate({
        width: "100%",
        opacity: 1.0,
        marginLeft: "0in",
        fontSize: "1em",
        borderWidth: "1px"
      }, 1500 );
  });

  $(".sliderBox2").click(function() {
    $(this).animate({
        width: "70%",
        opacity: 0.0,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "1px"
      }, 1500 ).animate({
        width: "100%",
        opacity: 1.0,
        marginLeft: "0.0in",
        fontSize: "1em",
        borderWidth: "0px"
      }, 500 );
  });


  $(".clickMe1").click(function() {

      // CLICK_ME_1 - Expand/Shrink
      $(this).animate({
        width: "70%",
        opacity: 0.0,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
      }, 1500 ).animate({
        width: "100%",
        opacity: 1.0,
        marginLeft: "0.0in",
        fontSize: "1em",
        borderWidth: "0px"
      }, 500 );

  });


  //   $("#navigationUL li a").hover(function() { 
  //   $(this).animate({ color: "#FF0000" }, 600); 
  // }, function() {
  //   $(this).animate({ color: "#00FF00" }, 300); 
  // });


  $('.tabs .tab-links a').on('click', function(e)  {
    var currentAttrValue = $(this).attr('href');
 
    // Show/Hide Tabbed Content
    $('.tabs ' + currentAttrValue).show().siblings().hide();
 
    // Change/remove current tab to active
    $(this).parent('li').addClass('active').siblings().removeClass('active');
 
    e.preventDefault();
  });

})
