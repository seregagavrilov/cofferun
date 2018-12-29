(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  var serverUrl = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var Validation = {

    isCompanyEmail: function (email, event) {
      if (/.+@bignerdranch\.com$/.test(email)){
        event.target.setCustomValidity('');
      }else{
        event.target.setCustomValidity('This email was not validated');
      }
    },

    forAcceptabilityDecaf: function (number, string) {
      if (number > 20 && /decaf+/.test(string)) {
        event.target.setCustomValidity('This email was not validated');
      }else {
        event.target.setCustomValidity('');
      }
    },

    isOrderexists: function (email, event) {
      $.get(serverUrl+ '/' + email, function() {
        event.target.setCustomValidity('okey go')
        console.log();    
      }).fail(function (){
        event.target.setCustomValidity('This order has been exist');
      });
    },
  };

  App.Validation = Validation;
  window.App = App;
})(window);
