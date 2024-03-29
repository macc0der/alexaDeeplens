# Build An Alexa Hello World Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />


## Testing Your Alexa Skill

So far, we have created a Voice User Interface, and deployed code to a backend service linked to the skill.  Your skill is now ready to test.

1.  If you are not continuing immediately from the previous step, **go back to the [Amazon Developer Portal](https://developer.amazon.com/alexa/console/ask?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-world-nodejs-V2_GUI-4&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_hello-world-nodejs-V2_GUI-4_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) and select your skill from the list.**

2. Access the **Alexa Simulator**, by selecting the **Test** tab from the top navigation menu.  Your browser may request permission to access your microphone.  While it is recommended to do so, it is not required.  Do note that if you don't allow access to the microphone, you must type your utterances to Alexa in the simulator.

3. Notice the dropdown labeled "Skill testing is enabled in:", found just underneath the top navigation menu.
Toggle the dropdown from **Off** to **Development**.

4. To validate that your skill is working as expected, invoke your skill from the **Alexa Simulator** just below. You can either type or click and hold the mic from the input box to use your voice.
	1. **Type** "Open" followed by the invocation name you gave your skill previously. For example, "Open hello world".
	2. **Use your voice** by clicking and holding the mic on the side panel and saying "Open" followed by the invocation name you gave your skill.
	3. **If you've forgotten the invocation name** for your skill, revisit the **Build** panel on the top navigation menu and select **Invocation** from the sidebar to review it.

* *Tip: Always finish your test by saying "stop" to formally end your session.*


5. Ensure your skill works the way that you designed it to.
	* After you interact with the Alexa Simulator, you should see the Skill I/O **JSON Input** and **JSON Output** boxes get populated with JSON data. You can also view the **Device Log** to trace your steps.
	* If it's not working as expected, you can dig into the JSON to see exactly what Alexa is sending and receiving from the endpoint. If something is broken, you can find the error in AWS Cloudwatch.


6.  Troubleshooting with CloudWatch log messages: You can add console.log() statements to your code, to track what is happening as your code executes, and help to figure out what is happening when something goes wrong.
You will find the log to be incredibly valuable as you move into more advanced skills.


[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png)](./customize-skill-content.md)

---

#### Optional: AWS-Hosted skill testing option
If you are not using Alexa-Hosted, but are hosting the code in your AWS account, you can run unit tests within the AWS Lambda console to help test and troubleshoot your code.

1.  **Configure a test event in AWS Lambda.** Now that you are familiar with the **request** and **response** boxes in the Service Simulator, it's important for you to know that you can use your **requests** to directly test your Lambda function every time you update it.  To do this:
    1.  Enter an utterance in the service simulator, and copy the generated Lambda Request (JSON Input) for the next step.

    2.  **Open your Lambda function in AWS, open the Actions menu, and select "Configure test events."**![Configure Test events drop down](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-2-configure-test-event._TTH_.png)

    3.  **Select "Create new test event". Choose "Amazon Alexa Start Session" as the Event Template from the dropdown list.** You can choose any test event in the list, as they are just templated event requests, but using "Amazon Alexa Start Session" is an easy one to remember.
![Alexa Start Session](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-3-alexa-start-session._TTH_.png)

    4.  Type in an Event Name into the **Event Name** field.  Delete the contents of the code editor, and paste the Lambda request you copied above into the code editor. The Event Name is only visible to you. Name your test event something descriptive and memorable. For our example, we entered an event name as "startSession". Additionally, by copying and pasting your Lambda Request from the service simulator, you can test different utterances and skill events beyond the pre-populated templates in Lambda.

    5.  **Click the "Create" button.** This will save your test event and bring you back to the main configuration for your lambda function.

    6.  **Click the "Test" button to execute the "startSession" test event.**
![Test with event](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-save-and-test._TTH_.png)

        This gives you visibility into four things:

        *  **Your response, listed in the "Execution Result."**
![execution result](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-5-1-execution-result._TTH_.png)

        *  **A Summary of the statistics for your request.** This includes things like duration, resources, and memory used.
![Summary](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png)

        *  **Log output.**  By effectively using console.log() statements in your Lambda code, you can track what is happening inside your function, and help to figure out what is happening when something goes wrong.  You will find the log to be incredibly valuable as you move into more advanced skills.
![CloudWatch Logs](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-3-log-output._TTH_.png)

        *  **A link to your [CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:) logs for this function.**  This will show you **all** of the responses and log statements from every user interaction.  This is very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

7.  **Other testing methods to consider:**

    *  [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](https://alexa.design/testing-using-postman) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).

8.  **If your sample skill is working properly, you can now customize your skill.**

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png)](./customize-skill-content.md)
