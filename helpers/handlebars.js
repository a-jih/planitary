// Custom Handlebars helpers

function hbsHelpers(hbs) {
  return hbs.create({
    helpers: {
      if_eq: function(a, b, opts) {
        if(a == b)
        {
          return opts.fn(this);
        }
        else
        {
          return opts.inverse(this);
        }
      },
      if_in: function(elem, list, opts) {
        if (list.indexOf(elem) > -1)
        {
          return opts.fn(this);
        }
        else
        {
          return opts.inverse(this);
        }
      }
    }
  });
}

module.exports = hbsHelpers;