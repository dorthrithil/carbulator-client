/**
 * A description of an eror.
 */
interface ErrorDescription {
  title: string;
  description: string;
}

/**
 * A dictionary of error descriptions.
 */
interface ErrorDictionary {
  [index: string]: ErrorDescription;
}


/**
 * A dictionary with translations for known server error messages.
 */
export const knownErrors: ErrorDictionary = {
  USER_ALREADY_EXISTS: {
    title: 'Nutzername bereits vergeben',
    description: 'Dieser Nutzername wird im System bereits verwendet.'
  },
  USER_DOESNT_EXIST: {
    title: 'Ungültige Kombination',
    description: 'Die Kombination von Nutzername und Passwort existiert nicht.'
  },
  WRONG_CREDENTIALS: {
    title: 'Ungültige Kombination',
    description: 'Die Kombination von Nutzername und Passwort existiert nicht.'
  },
  USERNAME_TOO_SHORT: {
    title: 'Nutzername zu kurz',
    description: 'Der Nutzername muss mindestens 3 Zeichen haben.'
  },
  PASSWORD_TOO_SHORT: {
    title: 'Passwort zu kurz',
    description: 'Das Passwort muss mindestens 8 Zeichen haben.'
  },
  USERNAME_INVALID: {
    title: 'Nutzername ungültig',
    description: 'Erlaube Zeichen: a-z, A-Z, 0-9.'
  }
};
