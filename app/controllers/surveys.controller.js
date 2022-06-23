const models = require('../models');
const response = require('../functions/serviceUtil.js');

module.exports = {
  name: 'surveysController',

  create: async (req, res, next) => {
    try {
      const result = await models.sequelize.transaction(async (transaction) => {
        const createSurvey = new models.Survey()
        createSurvey.name = req.body.name
        createSurvey.suggestion = req.body.suggestion

        const initSurvey = await models.Survey.create(createSurvey.dataValues, { transaction })

        const survey_id = initSurvey.id
        const answers = req.body.answers

        await Promise.all([
          models.Answer.create({ survey_id, question_id: 1, answer: answers[0] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 2, answer: answers[1] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 3, answer: answers[2] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 4, answer: answers[3] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 5, answer: answers[4] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 6, answer: answers[5] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 7, answer: answers[6] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 8, answer: answers[7] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 9, answer: answers[8] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 10, answer: answers[9] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 11, answer: answers[10] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 12, answer: answers[11] }, { transaction }),
          models.Answer.create({ survey_id, question_id: 13, answer: answers[12] }, { transaction }),
        ])

        const createdSurvey = await models.Survey.findAll({ 
          include: models.Answer 
        }, {
          transaction,
        })

        return createdSurvey
      })

      res.status(200).send(response.getResponseCustom(200, result))
      res.end()
    } catch (error) {
      next(error)
    }
  },

  find: async (req, res, next) => {
    try {
      const surveys = await models.Survey.findAll()
      if (!surveys) res.status(404).send(response.getErrorResponseCustom(404, 'Surveys not found')).res.end()

      res.status(200).send(response.getResponseCustom(200, surveys))
      res.end()
    } catch (error) {
      next(error)
    }
  },
  
  findOne: async (req, res, next) => {
    try {
      const survey = await models.Survey.findByPk(req.params.id, { include: models.Answer })
      if (!survey) res.status(404).send(response.getErrorResponseCustom(404, 'Survey not found')).res.end()

      res.status(200).send(response.getResponseCustom(200, survey))
      res.end()
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const survey = await models.Survey.findByPk(req.params.id, { include: models.Answer })
      if (!survey) res.status(404).send(response.getErrorResponseCustom(404, 'Survey not found')).res.end()

      res.status(200).send(response.getResponseCustom(200, survey))
      res.end()
    } catch (error) {
      next(error)
    }
  },
}