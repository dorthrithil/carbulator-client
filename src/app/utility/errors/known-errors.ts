/**
 * A description of an eror.
 */
interface ErrorDescription {
  message: string;
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
    message: 'USER_ALREADY_EXISTS',
    title: 'Nutzername bereits vergeben',
    description: 'Dieser Nutzername wird im System bereits verwendet.'
  },
  USER_DOESNT_EXIST: {
    message: 'USER_DOESNT_EXIST',
    title: 'Ungültige Kombination',
    description: 'Die Kombination von Nutzername und Passwort existiert nicht.'
  },
  WRONG_CREDENTIALS: {
    message: 'WRONG_CREDENTIALS',
    title: 'Ungültige Kombination',
    description: 'Die Kombination von Nutzername und Passwort existiert nicht.'
  },
  USERNAME_TOO_SHORT: {
    message: 'USERNAME_TOO_SHORT',
    title: 'Nutzername zu kurz',
    description: 'Der Nutzername muss mindestens 3 Zeichen haben.'
  },
  PASSWORD_TOO_SHORT: {
    message: 'PASSWORD_TOO_SHORT',
    title: 'Passwort zu kurz',
    description: 'Das Passwort muss mindestens 8 Zeichen haben.'
  },
  USERNAME_INVALID: {
    message: 'USERNAME_INVALID',
    title: 'Nutzername ungültig',
    description: 'Erlaube Zeichen: a-z, A-Z, 0-9.'
  },
  UNAUTHORIZED: {
    message: 'UNAUTHORIZED',
    title: 'Nicht autorisiert',
    description: 'Für diese Aktion fehlen dir die nötigen Rechte.'
  },
  CANT_START_TOUR_WHEN_HAVING_UNFINISHED_TOURS_IN_COMMUNITY: {
    message: 'CANT_START_TOUR_WHEN_HAVING_UNFINISHED_TOURS_IN_COMMUNITY',
    title: 'Nicht möglich',
    description: 'Eine neue Fahrt kann erst begonnen werden, wenn die vorherige abgeschlossen ist.'
  },
  START_KM_MUST_BE_GEQ_LAST_END_KM: {
    message: 'START_KM_MUST_BE_GEQ_LAST_END_KM',
    title: 'Kilometerstand zu niedrig',
    description: 'Der Kilometerstand der letzten Fahrt ist höher als der angegebene. Dies ist nciht möglich.'
  },
  COMMUNIY_DOESNT_EXIST: {
    message: 'COMMUNIY_DOESNT_EXIST',
    title: 'Gruppe existiert nicht',
    description: 'Die angegebene Gruppe existiert nicht im System.'
  },
  CANT_CREATE_PAYOFF_WITHOUT_REFUELS_AND_TOURS: {
    message: 'CANT_CREATE_PAYOFF_WITHOUT_REFUELS_AND_TOURS',
    title: 'Abrechnung nicht möglich',
    description: 'Eine Abrechnung ohne Fahrten und Tankfüllungen ist nicht möglich.'
  },
  CANT_CREATE_PAYOFF_WHEN_UNFINISHED_TOURS_EXIST: {
    message: 'CANT_CREATE_PAYOFF_WHEN_UNFINISHED_TOURS_EXIST',
    title: 'Abrechnung nicht möglich',
    description: 'Bitte beende alle Fahrten bevor du eine Abrechnung erstellst.'
  }
};
