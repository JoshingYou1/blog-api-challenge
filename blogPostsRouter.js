const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const {BlogPosts} = require("./models");

router.get("/", (req, res) => {
    res.json(BlogPosts.get());
});

router.post("/", jsonParser, (req, res) => {
    const requiredFields = ["title", "author", "publishDate", "content"];
    for (i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const errorMessage = `Sorry, but you must include \`${field}\` in the request body.`;
            console.error(errorMessage);
            return res.status(400).send(errorMessage);
        }
    }

    const post = BlogPosts.create(req.body.title, req.body.author, req.body.publishDate, req.body.content);
    res.status(201).json(post);
});

router.put("/:id", jsonParser, (req,res) => {
    const requiredFields = ["title", "author", "publishDate", "content"];
    for (i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const errorMessage = `Sorry, but you must include \`${field}\` in the request body`;
            console.error(errorMessage);
            return res.status(400).send(errorMessage);
        }
    }

    if (req.params.id !== req.body.id) {
        const message = `Sorry, but the request path id, \`${req.params.id}\`, and the request body id, \`${req.body.id}\`, must match each other.`;
        console.error(message);
        return res.status(400).send(message);
    }

    console.log(`Updating blog post \`${req.params.id}\`...`);
    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        content: req.body.content
    });

    res.status(204).end();
});

router.delete("/:id", (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.id}\``);
    res.status(204).end();
});

BlogPosts.create("Far Far Away", "Sally Student", "January 21, 2007", "Far far away, behind the word mountains, far from the countries" + 
"Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large" + 
"language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in" +
"which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost" +
"unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The" +
"Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind" +
"Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills" +
"of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline" + 
"of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy" + 
"warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its" + 
"origin would be the word \"and\" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could" + 
"convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her" + 
"into their agency, where they abused her for their projects again and again.");

BlogPosts.create("Pangram", "Joe Shmoe", "September 5, 2009", "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog." +
"Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived" +
"waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing" + 
"daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my" + 
"woven flax jodhpurs! \"Now fax quiz Jack!\" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps" + 
"Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs" + 
"jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by" + 
"MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch \"Jeopardy!\", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged" + 
"for blue quartz. Brawny gods just flocked up to quiz and vex him. Adjusting quiver and bow, Zompyc[1] killed the fox. My faxed joke won a pager" + 
"in the cable TV quiz show. Amazingly few discotheques provide jukeboxes. My girl wove six dozen plaid jackets before she quit. Six big devils" + 
"from Japan quickly forgot how to waltz. Big July earthquakes confound zany experimental vow. Foxy parsons quiz and cajole the lovably dim" + 
"wiki-girl. Have a pick: twenty six letters - no forcing a jumbled quiz! Crazy Fredericka bought many very exquisite opal jewels. Sixty zippers" + 
"were quickly picked from the woven jute bag. A quick movement of the enemy will jeopardize six gunboats.");

module.exports = router;
