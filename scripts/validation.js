(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
      isCompanyEmail: function(email) {
        return /.+@bignerdranch\.com$/.test(email);
      },

      forAcceptabilityDecaf: function(number, string) {
        if (number > 20 &&  /decaf+/.test(string)) {
          return false;
        }
      }
    };
    App.Validation = Validation;
    window.App = App;
  })(window);
