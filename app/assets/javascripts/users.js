$document.ready(function(){
  Stripe.setPublishableKey($('meta[name="stripe_key"]').attr('content'));
  //Watch forform submission
  $("#form-submit-btn").click(function(event){
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    if(!error)  {
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
       
    }
      return false;
  });
  
  function stripeResponseHandle(status, response) {
    var f = $("#new_user");
    var token = response.id
    //add the tokento the form:
    f.append('input type="hidden" name="user[stripe_card_token]" value="'+ token +'"/>');
    //submit the form
    f.get(0).submit();
  }
  
});