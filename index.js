const { check } = require('./browser');

// const groupName = 'Umschreibung eines ausländischen Führerscheins';
// const itemNames = ['Umschreibung eines ausländischen Führerscheins (kein EU/EWR-Führerschein) beantragen'];

const groupName = 'Ortskundeprüfung';
const itemNames = ['Anmeldung und Vereinbarung Prüftermin'];

check(groupName, itemNames).then(count => console.log(`there are ${count} bookable dates`));
