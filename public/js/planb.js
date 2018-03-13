'use strict';

$(document).ready(function () {
  initializePage();
});


function initializePage() {
  $('.plan').click(function (e) {
    ga('send', 'event', 'Page Click', 'On B');
    
    let planid  = $(this).attr('id');
    let groupid = $(this).closest('.grpplans').attr('id');

    //$.post('/eventCreation', { gid: groupid, pid: planid });
    $.get('/events')
  })
}