var fields = {};
$("#theForm").find(":input").each(function() {
    // The selector will match buttons; if you want to filter
    // them out, check `this.tagName` and `this.type`; see
    // below
    fields[this.name] = $(this).val();
});
var obj = {fields: fields};