'use strict';

$(document).ready(function () {
  initializePage();
});

$(".Listen").click(function() {
	console.log("Page A");
	ga('send', 'event', 'Page Click', 'On A');
});

function initializePage() {
  $('.plan').click(function (e) {
    let planid  = $(this).attr('id');
    let groupid = $(this).closest('.grpplans').attr('id');

    //$.post('/eventCreation', { gid: groupid, pid: planid });
    $.get('/events')
  })
}