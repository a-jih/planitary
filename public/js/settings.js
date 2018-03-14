'use strict';

$(document).ready(function () {
  initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
      labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      var fileName = '';
      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else
        fileName = e.target.value.split('\\').pop();

      if (fileName) {
        label.querySelector('span').innerHTML = fileName;
        label.classList.add('btn-success');
        $('#ical-upload').attr('disabled', false);
      } else {
        label.innerHTML = labelVal;
        label.classList.remove('btn-success');
        $('#ical-upload').attr('disabled', true);
      }
    });
  });
}