(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
      if (!selector) {
        throw new Error('No selector provide')
      }
      this.$formElement = $(selector)
      if (this.$formElement.length === 0) {
        throw new Error('Cold not find element with selector: ' + selector);
      }
    }
    FormHandler.prototype.addChangeHendler = function(selector, currentEvent, func) {
      var element = this.$formElement.find(selector);
      element.on(currentEvent, func);
    };

    FormHandler.prototype.addInputHandler = function(fn) {
      console.log('Setting input handler for form');
      this.$formElement.on('input', '[name="emailAddress"]', function(event) {
        var emailAddress = event.target.value;
        if (fn(emailAddress)) {
          event.target.setCustomValidity('');
        } else {
          var message = emailAddress + ' is not an authorized email address!';
          event.target.setCustomValidity(message);
        }

      });
    };

    FormHandler.prototype.addStrengForDecaf = function(fn) {
      this.$formElement.on('input', '[name="coffee"],[name="strength"]', function(event) {
          if (fn($('[name="strength"]').val(), event.target.value) === false) {
            var message = 'this not an authorized sreng for this coffee!';
            event.target.setCustomValidity(message);
          } else {
            event.target.setCustomValidity('');
          }
        });
      };

        FormHandler.prototype.addSubmitHandler = function(fn) {
          console.log('Setting submit handler for form');
          this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
              data[item.name] = item.value;
              console.log(item.name + ' is ' + item.value);
            });
            fn.call(this, data);
            this.reset();
            this.elements[0].focus();
          });
        }; App.FormHandler = FormHandler; window.App = App;
      })(window);
