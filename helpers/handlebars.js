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
      }
    }
  });
}

module.exports = hbsHelpers;