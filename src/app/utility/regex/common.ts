/**
 * Regular expression for email addresses.
 */
export const emailRegex = new RegExp(''
  + /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.source
);
