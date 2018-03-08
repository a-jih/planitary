'use strict';

$(document).ready(function () {
  initializePage();
});

$("button").click(function() {
	console.log("PageB");
	ga('send', 'event', 'Page Click', 'On B');
});

function initializePage() {
  $('.plan').click(function (e) {
    let planid  = $(this).attr('id');
    let groupid = $(this).closest('.grpplans').attr('id');

    //$.post('/eventCreation', { gid: groupid, pid: planid });
    $.get('/events')
  })
}