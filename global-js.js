const goToOrderPage = () => {
    location.href = "order.html"
}
const goToHowToPage = () => {
    location.href = "how-it-works.html"
}
const goToStringsPage = () => {
    location.href = "strings.html"
}
const goToPricingPage = () => {
    location.href = "pricing.html"
}
const goToAboutPage = () => {
    location.href = "about.html"
}
const goToEventsPage = () => {
    location.href = "events.html"
}
const goToHomePage = () => {
    location.href = "index.html"
}
const goToFAQsPage = () => {
    location.href = "faqs.html"
}

class Question{
    constructor(first_name, last_name, contact_info, message) {
        this.customer_name = first_name + " " + last_name;
        this.contact_info = contact_info;
        this.message = message;
    }
}

async function sendOrderEmail(racketList, contactInfo) {
    const formatAddOns = (racket) => {
        var output = "";
        racketList[racket].grommets ? output += "Grommets, " : null;
        racketList[racket].grip ? output += "Grip, " : null;
        racketList[racket].shock ? output += "Shock" : null;
        if(output.slice(-1) == " ") {
            return output.slice(0, -2);
        } else if (output == "") {
            output = "None";
        }
        return output;
    }

    var timelineOutput = "";

    if(contactInfo.timeline == 1) {
        timelineOutput = "2-24hrs";
    } else if (contactInfo.timeline == 2) {
        timelineOutput = "1-2 days";
    } else if(contactInfo.timeline == 3) {
        timelineOutput = "2+ days";
    }

    var racketListOutput = "";

    for(let racket = 0; racket < racketList.length; racket++) {
        racketListOutput += 
            "Racket " + racketList[racket].number + ": \n" +
            (racketList[racket].provider ? "String provider: Customer\n" : "String provider: Advantage Stringing\n") +
            "Racket Model: " + racketList[racket].brand + " " + racketList[racket].model + "\n" +
            "Mains: " + racketList[racket].main + ", " + racketList[racket].mainTension + " lbs\n" +
            "Crosses: " + racketList[racket].cross + ", " + racketList[racket].crossTension + " lbs\n" +
            "Add ons: " + formatAddOns(racket) + "\n\n"
    }

    outputList = {
        customer_name: contactInfo.first + " " + contactInfo.last,
        contact_info: contactInfo.contact,
        timeline: timelineOutput,
        notes: contactInfo.notes,
        rackets: racketListOutput
    }

    emailjs.send("AdvantageStringing", "order_template", outputList)
    .then(function(res){
        console.log("success", res.status);
    })
}

function sendQuestionEmail(question) {

    var outputList = {
        customer_name: question.customer_name,
        contact_info: question.contact_info,
        question: question.message
    }

    emailjs.send("AdvantageStringing", "question_template", outputList)
    .then(function(res){
        console.log("success", res.status);
    })
}




