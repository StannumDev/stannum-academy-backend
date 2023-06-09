const { Schema, model } = require('mongoose');

const user = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  venture: String,
  territory: String,
  birthdate: String,
  startDate: String,
  rankingPosition: String,
  totalScore: String,
  biography: String,
  welcomeViewed: Boolean,
  status: String,
  role: String,
  questionnaire1StartEnabled: Boolean,
  questionnaire1FinalEnabled: Boolean,
  dominioDirectivoTestInicial: {
    date: String,
    estrategico: {
      question1: String,
      sectionScore: String,
    },
    conceptos: {
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
        question7: String,
        question8: String,
        question9: String,
        question10: String,
        question11: String,
        question12: String,
        question13: String,
        question14: String,
        question15: String,
        question16: String,
        sectionScore: String,
      },
    mercado: { 
        question1: String,
        question1Justification: String,
        question2: String,
        question2Justification: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        sectionScore: String,
    },
    emprendimiento: {
        question1: String,
        question1Justification: String,
        question2: String,
        question2Justification: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        question6: String,
        question6Justification: String,
        question7: String,
        question8: String,
        question9: String,
        question10: String,
        question11: String,
        question12: String,
        question13: String,
        question14: String,
        question14Justification: String,
        question15: String,
        question15Justification: String,
        sectionScore: String,
    },
    habilidadesDirectivas: {
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
        question7: String,
        question8: String,
        sectionScore: String,
    },
    habilidadesDigitales: {
        question1: String,
        question1Justification: String,
        question2: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        sectionScore: String,
    },
    totalScore: String,
  },
  dominioDirectivoTestFinal: {
    estrategico: {
      question1: String,
      sectionScore: String,
    },
    conceptos: {
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
        question7: String,
        question8: String,
        question9: String,
        question10: String,
        question11: String,
        question12: String,
        question13: String,
        question14: String,
        question15: String,
        question16: String,
        sectionScore: String,
      },
    mercado: { 
        question1: String,
        question1Justification: String,
        question2: String,
        question2Justification: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        sectionScore: String,
    },
    emprendimiento: {
        question1: String,
        question1Justification: String,
        question2: String,
        question2Justification: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        question6: String,
        question6Justification: String,
        question7: String,
        question8: String,
        question9: String,
        question10: String,
        question11: String,
        question12: String,
        question13: String,
        question14: String,
        question14Justification: String,
        question15: String,
        question15Justification: String,
        sectionScore: String,
    },
    habilidadesDirectivas: {
        question1: String,
        question2: String,
        question3: String,
        question4: String,
        question5: String,
        question6: String,
        question7: String,
        question8: String,
        sectionScore: String,
    },
    habilidadesDigitales: {
        question1: String,
        question1Justification: String,
        question2: String,
        question3: String,
        question3Justification: String,
        question4: String,
        question4Justification: String,
        question5: String,
        question5Justification: String,
        sectionScore: String,
    },
    totalScore: String,
  },
});

module.exports = model('User', user);