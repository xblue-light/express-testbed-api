import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newViolation = () => {
  const statusChance = Math.random();
  return {
    violationID: Math.floor(Math.random() * 3000),
    publishedTimeStamp: 
    Math.floor(Math.random() * 30) + '/' + Math.floor(Math.random() * 11) + '/' + 2019 + " " + Math.floor(Math.random() * 22) + ':49',
    country: 'BULGARIA',
    registrationNumber: Math.floor(Math.random() * 3000),
    category: 
      statusChance > 0.55
      ? "А"
      : statusChance > 0.33 ? "Б"
      : statusChance > 0.23 ? "В"
      : statusChance > 0.13 ? "М" : 'С',
    
    owner: namor.generate({word: 1, numbers: 0}),
    typeDocument: 
      statusChance > 0.55
      ? "ФИШ"
      : statusChance > 0.33 ? "ФИШ С ГЛОБА"
      : statusChance > 0.23 ? "ПАУАН"
      : statusChance > 0.13 ? "АУАН" : 'НП',

    //currentStatus: namor.generate({word: 1, numbers: 0}),
    currentStatus: 
    
      statusChance > 0.55
        ? "Отворен"
        : statusChance > 0.33 ? "Изпратен"
        : statusChance > 0.23 ? "Анулиран"
        : statusChance > 0.13 ? "Платен" : 'Приключен',

    createdBy: namor.generate({word: 1, numbers: 0}),
    lastEditedBy: Math.floor(Math.random() * 30) + '/' + Math.floor(Math.random() * 11) + '/' + 2019,
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 50) {
  return range(len).map(d => {
    return {
      ...newViolation(),
      children: range(10).map(newViolation)
    };
  });
}