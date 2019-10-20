/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales
const languageStrings = require('./languageStrings');
const converter = require('number-to-words');



// Populate list of alphabets
function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}
const letter = genCharArray('a', 'z');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LettersGameInProgressHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LettersGameInvoke';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_ALPHA');

        var rand_letter = letter[Math.floor(Math.random() * letter.length)]+'.';

        const final_speech = speakOutput+ " "+ rand_letter;

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        var attributes = handlerInput.attributesManager.getSessionAttributes();

        attributes.rand_letter = rand_letter


        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(final_speech)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .addDelegateDirective({
                                                                name: 'LettersGame',
                                                                confirmationStatus: 'NONE',
                                                                slots: {}
                                                              })
            .withShouldEndSession(false)
            .getResponse();
    }
};


const LettersGameCompleted = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LettersGame';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        //const speakOutput = handlerInput.t('WELCOME_ALPHA');
        const request = handlerInput.requestEnvelope.request;
        const alphabets = request.intent.slots['alphabets'].resolutions.resolutionsPerAuthority[0] ? request.intent.slots['alphabets'].resolutions.resolutionsPerAuthority[0].values[0].value.name : null;//replace this by input from DeepLens
        console.log("Alphabet identified   "+alphabets)
        var rand_letter = attributes.rand_letter;


      if (alphabets === rand_letter)
        {
            let congrats = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_03"/> Good Job!!!';

                return handlerInput.responseBuilder
                    .speak(congrats)
                    .withShouldEndSession(false)
                    .getResponse();

        }
      else
        {
            let sorry = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/> Somethings wrong with me, Im sorry';
            let tryAgain = "Let's try again"

                                return handlerInput.responseBuilder
                                    .speak(sorry)
                                    . reprompt(tryAgain)
                                    .addDelegateDirective({
                                                    name: 'LettersGameInvoke',
                                                    confirmationStatus: 'NONE',
                                                    slots: {}
                                                  })
                                                  .withShouldEndSession(false)
                                    //.getResponse();

        }
    }
};




const NumbersGameInProgressHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumbersGameInvoke';

    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_NUMBER');
        var rand_number = Math.floor(Math.random() * Math.floor(10));
        const final_speech = speakOutput+ " "+ rand_number;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        var attributes = handlerInput.attributesManager.getSessionAttributes();

        attributes.rand_number = rand_number;


        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(final_speech)
                                                .addDelegateDirective({
                                                                name: 'NumbersGame',
                                                                confirmationStatus: 'NONE',
                                                                slots: {}
                                                              })
                                                              .withShouldEndSession(false)
            .getResponse();
    }
};

const NumbersGameIntentCompleted = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumbersGame';
    },
    handle(handlerInput) {
 const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        var attributes = handlerInput.attributesManager.getSessionAttributes();
        const request = handlerInput.requestEnvelope.request;
        //const speakOutput = handlerInput.t('WELCOME_ALPHA');
        const numbers = parseInt(request.intent.slots && request.intent.slots.numbers ? request.intent.slots.numbers.value : 0); //replace this by input from DeepLens
        var rand_number = parseInt(attributes.rand_number);
        //var rand_number = converter.toWords(rand_number_raw);

        console.log("Checking Numbers: "+"NLU identified "+numbers+" Converted number "+rand_number)


      if (numbers === rand_number)
        {
            let congrats = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_03"/> Good Job!!!';

                return handlerInput.responseBuilder
                    .speak(congrats)
                    .getResponse();

        }
      else
        {
            let sorry = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/> Somethings wrong with me, Im sorry';
            let tryAgain = "Let's try again"

                                return handlerInput.responseBuilder
                                    .speak(sorry)
                                    . reprompt(tryAgain)
                                    .addDelegateDirective({
                                                    name: 'NumbersGameInvoke',
                                                    confirmationStatus: 'NONE',
                                                    slots: {}
                                                  })
                                                  .withShouldEndSession(false)
                                    .getResponse();

        }
    }
};





const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName: intentName});

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */

/*
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
*/
// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        LettersGameInProgressHandler,
        LettersGameCompleted,
        NumbersGameInProgressHandler,
        NumbersGameIntentCompleted,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
   // .addErrorHandlers(
    //    ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)
    .addResponseInterceptors(function(requestEnvelope, response){
    	console.log("\n" + "******************* REQUEST ENVELOPE **********************");
    	console.log("\n" + JSON.stringify(requestEnvelope, null, 4));
    	console.log("\n" + "******************* RESPONSE  **********************");
    	console.log("\n" + JSON.stringify(response, null, 4));
    })
    .lambda();
