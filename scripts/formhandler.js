(function (window){
  'use strict';
  var App = window.app || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    if (!selector){
      throw new Error('No selector provide')
    }
    this.$formElement = $(selector)
    if (this.$formElement.length ===0){
      throw new Error('Cold not find element with selector: '+ selector);
    }
  }
  FormHandler.prototype.addChangeHendler = function(selector, func){
      var element = this.$formElement.find(selector);
      element.on('input change', func);
    };

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      fn(data)
      this.reset();
      this.elements[0].focus();
    });
  };
  App.FormHandler = FormHandler;
  window.app = App;
})(window);
