(function(window) {
  'use strict'

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector privided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  };

  CheckList.prototype.addClickHandler = function(fn) {
    var DELAY = 1300,
      timer = null;
    this.$element.on('click', 'input', function(event) {
      if ($(this.$element.find('#checkboxID')).prop('checked')) {
        $(this.$element.find('#label')).css('color', '#c1c1c1');
        timer = setTimeout(function(a) {
          var email = event.target.value;
          fn.call(this, email).then(function (){
            this.removeRow(email)
          }.bind(a));
        }, DELAY, this);
      } else {
          clearTimeout(timer);
          fn.call(this, $('#checkboxID').val());
      }
    }.bind(this)).on("dblclick", function(e) {
      e.preventDefault();
    });
  }

  CheckList.prototype.addRow = function(coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress);
    var rowElement = new Row(coffeeOrder);
    this.$element.append(rowElement.$element)
  };

  CheckList.prototype.removeRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]')
      .remove();
  };

  function changeLabelColor (flavor, label) {
    if (flavor === 'caramel') {
      label.css('color', '#AE7324');
    } else if (flavor === 'almond') {
      label.css('color', '#63410F');
    } else if (flavor === 'mocha') {
      label.css('color', '#A1600F');
    };
  }

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label id=label ></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
      'id': 'checkboxID'
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
      changeLabelColor(coffeeOrder.flavor, $label);
    };
    description += ' [' + coffeeOrder.strength + 'x]';
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;

  }
  App.CheckList = CheckList;
  window.App = App;
})(window)
