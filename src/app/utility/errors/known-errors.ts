/**
 * A description of an error.
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
  USER_NOT_FOUND: {
    message: 'USER_NOT_FOUND',
    title: 'Nutzer nicht gefunden',
    description: 'Es konnte kein Nutzer für die angegebenen Daten gefunden werden.'
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
    description: 'Eventuell ist dein Login nicht mehr gültig. Bitte logge dich neu ein.'
  },
  CANT_START_TOUR_WHEN_HAVING_UNFINISHED_TOURS_IN_COMMUNITY: {
    message: 'CANT_START_TOUR_WHEN_HAVING_UNFINISHED_TOURS_IN_COMMUNITY',
    title: 'Nicht möglich',
    description: 'Eine neue Fahrt kann erst begonnen werden, wenn die vorherige abgeschlossen ist.'
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
  },
  OLD_PASSWORD_INCORRECT: {
    message: 'OLD_PASSWORD_INCORRECT',
    title: 'Altes Passwort falsch',
    description: 'Das alte Passwort ist nicht korrekt.'
  },
  RESET_PASSWORD_HASH_INVALID: {
    message: 'RESET_PASSWORD_HASH_INVALID',
    title: 'Link abgelaufen',
    description: 'Der Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen.'
  },
  EMAIL_INVALID: {
    message: 'EMAIL_INVALID',
    title: 'Ungültige E-Mail Adresse',
    description: 'Die verwendete E-Mail Adresse ist nicht gültig.'
  },
  TASK_DOESNT_EXIST: {
    message: 'TASK_DOESNT_EXIST',
    title: 'Aufgabe nicht gefunden',
    description: 'Die angeforderte Aufgabe wurde nicht gefunden.'
  },
  TASK_MUST_BE_EITHER_TIME_OR_KM_TRIGGERED: {
    message: 'TASK_MUST_BE_EITHER_TIME_OR_KM_TRIGGERED',
    title: 'Aufgaben Auslöser fehlerhaft',
    description: 'Eine Aufgabe muss entweder Zeit- oder Kilometerstand gesteuert sein.'
  },
  TASK_KM_NEXT_INSTANCE_MUST_BE_HIGHER_THEN_CURRENT_KM: {
    message: 'TASK_KM_NEXT_INSTANCE_MUST_BE_HIGHER_THEN_CURRENT_KM',
    title: 'Aufgaben Auslöser fehlerhaft',
    description: 'Eine Kilometerstand gesteuerte Aufgabe benötigt einen Startkilometerstand welcher höher als der aktuelle' +
      ' Kilometerstand ist.'
  },
  TASK_TIME_NEXT_INSTANCE_MUST_BE_HIGHER_THEN_CURRENT_TIME: {
    message: 'TASK_TIME_NEXT_INSTANCE_MUST_BE_HIGHER_THEN_CURRENT_TIME',
    title: 'Aufgaben Auslöser fehlerhaft',
    description: 'Eine Zeit gesteuerte Aufgabe kann nicht in der Vergangenheit starten.'
  },
  NO_GEOCODING_RESULTS: {
    message: 'NO_GEOCODING_RESULTS',
    title: 'Keine Suchergebnisse',
    description: 'Für die Suchanfrage wurde keine passende Adresse gefunden.'
  }
};
