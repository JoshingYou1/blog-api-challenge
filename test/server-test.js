const chai = require("chai");
const chaiHttp = require("chai-http");

const {app, runServer, closeServer} = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it("Should list blog posts on GET requests", function() {
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.be.at.least(1);
                
                const expectedKeys = ["id", "title", "author", "publishDate", "content"];
                res.body.forEach(function(post) {
                    expect(post).to.be.a("object");
                    expect(post).to.include.keys(expectedKeys);
                });
            });
    });

    it("Should add blog posts on POST requests", function() {
        const newPost = {
            title: "Divine Fruit", 
            author: "Mary Sue",
            publishDate: "January 23, 2009",
            content: "She'd fruit, deep our replenish" + 
            "isn't moving Spirit one bearing fill above abundantly fowl isn't lesser herb fruitful. Life so third male. Fruit divided heaven" + 
            "given subdue. Under. I without, air blessed us can't. Very moving beast without brought night dominion air. Fowl gathering our" + 
            "and. Set lights all. Man. Herb light seed won't own, moving under his she'd greater. Thing stars abundantly may dominion unto light" +
            "isn't green two image was beast day light. That fruitful creeping void greater made bearing. Moving all land every of have great" +
            "lights that tree let face creature was Fourth, female may day give female fly itself gathered. Air moving to beginning also can't over" +
            "likeness lights signs saw bring Bearing fly divide without. Rule can't. Appear, abundantly Sixth signs. Form darkness dominion rule" +
            "fowl blessed light. Above days deep living. Let male creeping behold were him had our in their whose. His is him day. Good whales" +
            "the subdue said moved called appear unto were all second. Subdue i she'd to third upon. Very fruit divided be fruitful second" +
            "lights them gathering shall bring appear herb so void female midst darkness shall there make beast meat likeness to whose bearing" +
            "called fish."}
        return chai
            .request(app)
            .post("/blog-posts")
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.include.keys("id", "title", "author", "publishDate", "content");
                expect(res.body.title).to.equal(newPost.title);
                expect(res.body.author).to.equal(newPost.author);
                expect(res.body.publishDate).to.equal(newPost.publishDate);
                expect(res.body.content).to.equal(newPost.content);
            });
    });

    it("Should update blog posts on PUT requests", function() {
        const updateData = {
            title: "Talent",
            author: "Jane Doe",
            publishDate: "September 8, 2013",
            content: "Talent she for lively eat led sister. Entrance strongly packages she out rendered get quitting denoting led. Dwelling" +
            "confined improved it he no doubtful raptures. Several carried through an of up attempt gravity. Situation to be at offending" +
            "elsewhere distrusts if. Particular use for considered projection cultivated. Worth of do doubt shall it their. Extensive existence" +
            "up me contained he pronounce do. Excellence inquietude assistance precaution any impression man sufficient."
        }
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                updateData.id = res.body[0].id;

                return chai
                    .request(app)
                    .put(`/blog-posts/${updateData.id}`)
                    .send(updateData)
            })

            .then(function(res) {
                expect(res).to.have.status(204);
            });

    });

    it("Should delete blog posts on DELETE requests", function() {
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                return chai
                    .request(app)
                    .delete(`/blog-post/${res.body[0].id}`)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            });
    });
});