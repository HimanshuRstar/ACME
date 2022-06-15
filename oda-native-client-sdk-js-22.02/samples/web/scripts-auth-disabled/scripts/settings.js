'use strict';

/**
 * SDK instantiation in client auth disabled mode. This mechanism is preferred for initial integration of the SDK with
 * the web app.
 * When client authentication has been disabled, only connections made from unblocked lists (allowed domains) are
 * allowed at the server. This use case is recommended when the client application can’t generate a signed JWT (because
 * of a static website or no authentication mechanism for the web/mobile app) but requires ODA integration. It can also
 * be used when the chat widget is already secured and visible to only authenticated users in the client platforms (Web
 * Application with the protected page).
 * For other cases, it is recommended that client auth enabled mode is used when using the SDK for production as it adds
 * another layer of security when connecting to a DA/skill.
 */

/**
 * Initializes the SDK and sets a global field with passed name for it the can
 * be referred later
 *
 * @param {string} name Name by which the chat widget should be referred
 */

initSdk('Bots');
function initSdk(name) {
    // Retry initialization later if the web page hasn't finished loading or the WebSDK is not available yet
    if (!document || !document.body || !WebSDK) {
        setTimeout(function () {
            initSdk(name);
        }, 2000);
        return;
    }

    if (!name) {
        name = 'Bots';          // Set default reference name to 'Bots'
    }
    var Bots;

    /**
     * SDK configuration settings
     * In client auth disabled mode, 'URI' and 'channelId' fields must be passed.
     */
    var chatWidgetSettings = {
        URI: 'oda-acea7175d4164fa08650893a8e4df0c9-da2.data.digitalassistant.oci.oraclecloud.com',  // ODA URI, only the hostname part should be passed, without the https://
        channelId: 'dac50dbc-3db4-4ebd-ba62-dbfe45d62245',  // Channel ID, available in channel settings in ODA UI
        // userId: '<userID>',                      // User ID, optional field to personalize user experience
        enableAutocomplete: true,
        enableAutocompleteClientCache: true,                   // Enables autocomplete suggestions on user input
        enableBotAudioResponse: true,               // Enables audio utterance of skill responses
        enableClearMessage: true,                   // Enables display of button to clear conversation
        enableSpeech: true,
        initUserHiddenMessage: 'hi',                   // Enables voice recognition
        showConnectionStatus: true,                 // Displays current connection status on the header
        i18n: {                                     // Provide translations for the strings used in the widget
            en: {                                   // en locale, can be configured for any locale
                chatTitle: 'Oracle Assistant'       // Set title at chat header
            }
        },
        timestampMode: 'relative',                  // Sets the timestamp mode, relative to current time or default (absolute)
        theme: WebSDK.THEME.DEFAULT,           // Redwood dark theme. The default is THEME.DEFAULT, while older theme is available as THEME.CLASSIC
        icons: {
            avatarBot: 'oda-native-client-sdk-js-22.02/samples/web/common/images/chatbot.png',
            // avatarUser: 'images/user-icon.png',
            logo: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="black" class="bi bi-robot" viewBox="0 0 16 16"><path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/><path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/></svg>',
            launch: 'oda-native-client-sdk-js-22.02/samples/web/common/images/chatbot.png'
        },
        fontFamily: 'Oracle Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
        initUserProfile: {
            profile: {
                firstName: 'Kian Doyle'
            }
        }

    };

    Bots = new WebSDK(chatWidgetSettings);
    Bots.on('message', feedbackInChat);
    // Connect to skill when the widget is expanded for the first time
    var isFirstConnection = true;
    Bots.on(WebSDK.EVENT.WIDGET_OPENED, function () {
        if (isFirstConnection) {
            Bots.connect();
            isFirstConnection = false;
        }
    });

    // Create global object to refer Bots
    window[name] = Bots;
    customUI();
    document.querySelector('.oda-chat-title').innerHTML = "Let's Chat!"
    document.querySelectorAll('.oda-chat-connection-status ').innerHTML = "Ready"
    Bots.on('click:audiotoggle', function (status) {
        if (status === true) {
            console.log('Audio response is turned on.');
        } else {
            console.log('Audio response is turned off.');
        }
    });
}

async function feedbackInChat(msg) {
    await sleep(0);
    if (msg.messagePayload && msg.messagePayload.text && (msg.messagePayload.text.includes("how would you rate your chat experience"))) {
        const hideMessage = document.getElementsByClassName('oda-chat-message-content');
        for (let x = 0; x < hideMessage.length; x++) {
            const div = hideMessage[x];
            const content = div.textContent.trim();

            if (content === 'Overall, how would you rate your chat experience?') {
                div.style.display = 'none';
                div.insertAdjacentHTML('afterend',
                    `<div class="oda-chat-prompt-banner ">
                <div class="oda-chat-prompt-banner-main-content oda-chat-flex">
                    <div class="oda-chat-prompt-banner-content">
                        <div class="oda-chat-prompt-banner-text" role="alert">Overall, how would you rate your chat
                            experience?</div>
                    </div>
                </div>
                <div class="oda-chat-action-wrapper oda-chat-flex rating">        
                    <div  class="stars">
                        <input type="radio" name="rate" id="five" value="5" >
                        <label for="five" onclick="switchFeedbackPositive()"><span class="feedbackLabel">Excellent</span></label>
                        <input type="radio" name="rate" id="four" value="4">
                        <label for="four" onclick="switchFeedbackPositive()"><span class="feedbackLabel">Good</span></label>
                        <input type="radio" name="rate" id="three" value="3">
                        <label for="three" onclick="switchFeedbackPositive()"><span class="feedbackLabel">Okay</span></label>
                        <input type="radio" name="rate" id="two" value="2">
                        <label for="two" onclick="switchFeedbackNegative()"><span class="feedbackLabel">Bad</span></label>
                        <input type="radio" name="rate" id="one" value="1">
                        <label for="one" onclick="switchFeedbackNegative()"><span class="feedbackLabel">Poor</span></label>
                    </div>        
                </div>
                <div class="skipAndClose" id="closeBot" onclick="destroyBot()">Skip and Close</div>
            </div>`)
            }
        }
    }
}

function customUI() {

    var element = document.getElementsByClassName('oda-chat-flex');
    console.log('abcde', element)
    element[0].insertAdjacentHTML("beforeBegin", "\n<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css' type='text/css'></link>\n")
    element[0].insertAdjacentHTML("beforeBegin", `\n<link rel='stylesheet' href='DigitalAssistant/style.css' type='text/css' rel='preload' as='style' onload="this.rel='stylesheet'" onerror="this.rel='stylesheet'"></link>\n`);

    var newSvg = document.getElementsByClassName('oda-chat-header-actions');
    newSvg[0].insertAdjacentHTML("beforeBegin", '<h6 class="menu">Menu</h6>');

    let feedbackForm = document.getElementsByClassName('oda-chat-conversation')
    feedbackForm[0].insertAdjacentHTML("beforeEnd", `<div dir="auto" class="oda-chat-dialog-wrapper oda-chat-end-conversation-prompt feedbackForm">
        <div dir="auto" class="oda-chat-prompt-banner-background"></div>
        <div dir="auto" class="oda-chat-prompt-banner feedbackForm">
            <div dir="auto" class="oda-chat-prompt-banner-main-content oda-chat-flex ">
                <div dir="auto" class="oda-chat-prompt-banner-content">
                    <div dir="auto" class="oda-chat-prompt-banner-text" role="alert">Overall, how would you rate your chat experience?</div>
                </div></div>
            <div dir="auto" class="oda-chat-action-wrapper oda-chat-flex rating">             
                <div onclick="switchFeedbackPositive()" class="stars">
                    <input type="radio" name="rate" id="five" value="5">
                        <label for="five"><span class="feedbackLabel">Excellent</span></label>
                        <input type="radio" name="rate" id="four" value="4">
                            <label for="four"><span class="feedbackLabel">Good</span></label>
                            <input type="radio" name="rate" id="three" value="3">
                                <label for="three"><span class="feedbackLabel">Okay</span></label>
                                <input type="radio" name="rate" id="two" value="2">
                                    <label for="two"><span class="feedbackLabel">Bad</span></label>
                                    <input type="radio" name="rate" id="one" value="1">
                                        <label for="one"> <span class="feedbackLabel">Poor</span></label>
                                    </div>                                   
                                </div>
                                <div class="skipAndClose" id="closeBot" onclick="destroyBot()">Skip and Close</div>
                                </div>                                
                            </div>`)

    let feedbackFormAfterPositive = document.getElementsByClassName('oda-chat-conversation')
    feedbackFormAfterPositive[0].insertAdjacentHTML("beforeEnd", `<div dir="auto" class="oda-chat-dialog-wrapper oda-chat-end-conversation-prompt feedbackFormAfterPositiveHide">
    <div dir="auto" class="oda-chat-prompt-banner-background"></div>
    <div dir="auto" class="oda-chat-prompt-banner feedbackFormAfterPositive">
        <div dir="auto" class="oda-chat-prompt-banner-main-content oda-chat-flex ">
            <div dir="auto" class="oda-chat-prompt-banner-content">
                <div dir="auto" class="oda-chat-prompt-banner-text" role="alert">Great! What went well?</div>
            </div></div>
        <div dir="auto" class="oda-chat-action-wrapper oda-chat-flex ">
            <div class="feedbackFormBtns">
            <button  aria-pressed ="false" class = "feedback-btn">Efficient Chat</button>
            <button  aria-pressed ="false" class = "feedback-btn">Helpful Resolution</button>
            <button  aria-pressed ="false" class = "feedback-btn">Knowledgeable Support</button>
            <button  aria-pressed ="false" class = "feedback-btn">Friendly Tone</button>
            <button  aria-pressed ="false" class = "feedback-btn">Easy to use</button>
            <button  aria-pressed ="false" class = "feedback-btn">Bot was Intelligent</button>
            <hr>
            <div><b>Did we resolve your Issue?<b></div>
            <br>
            <div class="wrapper">
            <input type="radio" name="select" id="option-1" >
            <input type="radio" name="select" id="option-2">
            <label for="option-1" class="option option-1">
                <span>Yes</span>
            </label>
            <label for="option-2" class="option option-2">
                 <span>No</span>
            </label>
            </div>
            <hr>
            <textarea id="feedbackTextArea" rows="4" cols="35" maxlength="250" name="comment" class="feedbackText" form="usrform" placeholder="Add Additional Feedback"></textarea>
            <div class="feedbackCharRemaining">250 characters remaining</div> 
            <hr>
            <button class="oda-chat-action-postback oda-chat-filled oda-chat-flex submitBtn" style="width: 100%" type="button" onclick="destroyBot()">Submit</button>
                     </div>
                      </div> 
                            </div>
                            </div>`)

    let feedbackFormAfterNegative = document.getElementsByClassName('oda-chat-conversation')
    feedbackFormAfterNegative[0].insertAdjacentHTML("beforeEnd", `<div dir="auto" class="oda-chat-dialog-wrapper oda-chat-end-conversation-prompt feedbackFormAfterNegativeHide">
     <div dir="auto" class="oda-chat-prompt-banner-background"></div>
     <div dir="auto" class="oda-chat-prompt-banner feedbackFormAfterPositive">
         <div dir="auto" class="oda-chat-prompt-banner-main-content oda-chat-flex ">
             <div dir="auto" class="oda-chat-prompt-banner-content">
                 <div dir="auto" class="oda-chat-prompt-banner-text" role="alert">What went wrong?</div>
             </div></div>
         <div dir="auto" class="oda-chat-action-wrapper oda-chat-flex ">
             <div class="feedbackFormBtns">
             <button  aria-pressed ="false" class = "feedback-btn">Took too long</button>
             <button  aria-pressed ="false" class = "feedback-btn">Unhelpful resolution</button>
             <button  aria-pressed ="false" class = "feedback-btn">Lack of expertise</button>
             <button  aria-pressed ="false" class = "feedback-btn">Unfriendly Tone</button>
             <button  aria-pressed ="false" class = "feedback-btn">Technical issues</button>
             <button  aria-pressed ="false" class = "feedback-btn">Bot didn't understand</button>
             <hr>
             <div><b>Did we resolve your Issue?<b></div>
             <br>
             <div class="wrapper">
             <input type="radio" name="select" id="option-1" >
             <input type="radio" name="select" id="option-2">
             <label for="option-1" class="option option-1">
                 <span>Yes</span>
             </label>
             <label for="option-2" class="option option-2">
                  <span>No</span>
             </label>
             </div>
             <hr>
             <textarea id="feedbackTextArea" rows="4" cols="35" maxlength="250" name="comment" class="feedbackText" form="usrform" placeholder="Add Additional Feedback"></textarea>
             <div class="feedbackCharRemaining">250 characters remaining</div> 
             <hr>
             <button class="oda-chat-action-postback oda-chat-filled oda-chat-flex submitBtn" style="width: 100%" type="button" onclick="destroyBot()">Submit</button>
                      </div>
                       </div> 
                             </div>
                             </div>`)

    let closeButton = document.getElementsByClassName('oda-chat-header');
    closeButton[0].insertAdjacentHTML('beforeEnd', '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="black" class="bi bi-x-lg closeBtn" viewBox="0 0 14 14" onclick="exitMenuOpen()"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>')

    let closeWidget = document.getElementsByClassName('oda-chat-conversation')
    closeWidget[0].insertAdjacentHTML("beforeEnd", `
    <div class="oda-chat-dialog-wrapper oda-chat-end-conversation-prompt closeWidget">
    <div class="oda-chat-prompt-banner-background"></div>
    <div class="oda-chat-prompt-banner">
    <div class="oda-chat-prompt-banner-main-content oda-chat-flex">
    <div class="oda-chat-prompt-banner-content">
    <div class="oda-chat-prompt-banner-text" role="alert">Are you sure you want to end the conversation?</div>
    <div class="oda-chat-prompt-banner-description">This will also clear your conversation history.</div>
    </div></div>
    <button class="oda-chat-action-postback oda-chat-filled oda-chat-flex yesBtn" onclick="clickYes()" type="button">End Chat</button>
    <button class="oda-chat-action-postback oda-chat-flex noBtn" onclick="clickNo()" type="button">Cancel</button>`)

    let btn = document.getElementsByClassName("feedback-btn");

    for (var i = 0; i < btn.length; i++) {
        (function (index) {
            btn[index].addEventListener("click", function () {
                // console.log("Clicked Button: " + index);
                let isPresent = false;
                this.classList.forEach(function (e) {
                    if (e == "button-focus") {
                        isPresent = true;
                    } else {
                        isPresent = false;
                    }
                });
                if (isPresent) {
                    this.classList.remove("button-focus");
                } else {
                    this.classList.add("button-focus");
                }
            });
        })(i);
    }

    const myTextArea = document.getElementById("feedbackTextArea");
    const remainingChars = document.querySelector(".feedbackCharRemaining");
    const MAX_CHARS = 250;

    myTextArea.addEventListener('input', () => {
        const remaining = MAX_CHARS - myTextArea.value.length;
        remainingChars.textContent = `${remaining} characters remaining`
    })
}

function exitMenuOpen() {
    document.querySelector('.closeWidget').style.display = 'block'
}

function clickNo() {
    document.querySelector('.closeWidget').style.display = 'none'
}

function clickYes() {
    document.querySelector('.closeWidget').style.display = 'none'
    document.querySelector('.feedbackForm').style.display = 'block'
}

function switchFeedbackPositive() {
    document.querySelector('.feedbackForm').style.display = 'none'
    document.querySelector('.feedbackFormAfterPositiveHide').style.display = 'block'
}
function switchFeedbackNegative() {
    document.querySelector('.feedbackForm').style.display = 'none'
    document.querySelector('.feedbackFormAfterNegativeHide').style.display = 'block'
}

function destroyBot() {
    Bots.destroy();
    initSdk('Bots');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};