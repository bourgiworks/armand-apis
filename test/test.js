// sign up test

const chai = require ('chai');
const chaiHttp= require('chai-http')
const app =require( '../app');

chai.should()
chai.use(chaiHttp)
describe('User APIs',()=>{
    describe('Create user',()=>{
        it('It should create user',(done)=>{
            chai
                .request(app)
                .post('/api/signUp')
                .send({
                    userName: "Kamali",
                    email: "kamali@gmail.com",
                    password: "12345",
                    role: 1
            })
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it('It should return a server  error if user does not created',(done)=>{
            chai
                .request(app)
                .post('/api/signUp')
                .send({
                    userName: "Kamali",
                    email: "m1@gmail.com",
                    password: "12345",
                    role: 1
            })
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it('It should return an error if you create an email existed',(done)=>{
          chai
              .request(app)
              .post('/api/signUp')
              .send({
                  userName: "Kamali",
                  email: "m1@gmail.com",
                  password: "12345",
                  role: 1
          })
              .end((err,res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('object')
                  done()
              })
      })
      })
    })
            //login


chai.should();
chai.use(chaiHttp);

describe('Login API', () => {
  // Testing login end-point
  describe('/api/login', () => {
    it('A registered user should be able to login/default language', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: '12345678',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.equal(
            'You have successfully logged in '
          );
          
        });
        done();
    });
    
    
    it('A non-registered user shouldnot be able to login', (done) => {
      const user = {
        email: 'nijohn@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.be.equal(
            'The email is not registered! Please first register'
          );
          
        });
        done();
    });
    
    
    it('A registered user with wrong password logins shouldnot be able to login', (done) => {
      const user = {
        email: 'jane@gmail.com',
        password: 'holdon',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.be.equal(
            'The email or passwords entered is wrong'
          );
         
        });
        done();
    });
    
  });
});

// articles test

chai.should()
chai.use(chaiHttp)
describe('Article APIs',()=>{
    describe('Post an article',()=>{
        it.skip('It should not post an article if User is not authenticated',(done)=>{
            chai
                .request(app)
                .post('/api/PostArticle')
                .send({
                    topic: "Kamali",
                    content: "kamali@gmail.com",
                    image: "uploads/image/60d7e85861ed9115f28dc857debab875"
                    
            })
                .end((err,res)=>{
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it.skip('It should return a server  error if article does not posted',(done)=>{
            chai
                .request(app)
                .post('/api/PostArticle')
                .send({
                  topic: "Kamali",
                  content: "kamali@gmail.com",
                  image: "uploads/image/60d7e85861ed9115f28dc857debab875"
            })
                .end((err,res)=>{
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it.skip('It should post an article if user is authenticated',(done)=>{
          chai
              .request(app)
              
              .post('/api/PostArticle')
              .send({
                topic: "Kamali",
                content: "kamali@gmail.com",
                image: "uploads/image/60d7e85861ed9115f28dc857debab875"
          })
              .end((err,res)=>{
                  res.should.have.status(400);
                  res.body.should.be.a('object')
                  done()
              })
      }),
   
      it('Every user should ger all posted Article',(done)=>{
        chai
            .request(app)
            .get('/api/getAllArticles')
            
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array')
                
            })
            done()
    }),
    it('it should return an error if user enter wrong ID',(done)=>{
      chai
          .request(app)
          .get('/api/GetOneArticle/:id')
          
          .end((err,res)=>{
              res.should.have.status(401);
              res.body.should.be.a('object')
               
              
          })
          done()
  }),
  it('it should be able to fetch single article',(done)=>{
    chai
        .request(app)
        .get('/api/GetOneArticle/:id')
        
        .end((err,res)=>{
            res.should.have.status(401);
            res.body.should.be.a('object')
            
            
        })
        done()
}),
it("it should update an article", (done) => {
  const _id='62567e42175b72ebaa68667e';
  const arti = {
      topic:"Julesxx",
      content:"Himbaza",
      image:"uploads/image/60d7e85861ed9115f28dc857debab875",
      roleId:2,
  };
chai.request(app)
.put("/api/UpdateArticle/"+_id)
.send(arti)
.end((err, res) => {
  res.should.have.status(400),
  res.body.should.be.a('object')

})
done();
}),
it('it should be able to delete single article if he/she is authenticated',(done)=>{
  chai
      .request(app)
      .get('/api/DeleteArticle/:id')
      
      .end((err,res)=>{
          res.should.have.status(404);
          res.body.should.be.a('object')
          
          
      })
      done()
})

      })
    })
// comment Test

chai.should()
chai.use(chaiHttp)
describe('Comment APIs',()=>{
    describe('Post a commrent',()=>{
        it.skip('It should not post a comment if User is not authenticated',(done)=>{
            chai
                .request(app)
                .post('/api/PostComment')
                .send({
                    name: "Kamali",
                    comment: "kamali@gmail.com",
                    like: 0
                    
            })
                .end((err,res)=>{
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    done()
                })
        }),
        it.skip('she/he should post a comment if authentication suceed',(done)=>{
          chai
              .request(app)
              .post('/api/PostComment')
              .send({
                name: "Kamali",
                    comment: "kamali@gmail.com",
                    like: 0
          })
              .end((err,res)=>{
                  res.should.have.status(400);
                  res.body.should.be.a('object')
                  done()
              })
      }),
      it.skip('Every user should ger all posted Comment',(done)=>{
        chai
            .request(app)
            .get('/api/getAllComment')
            
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array')
                
            })
            done()
    }),
    it('it should return an error if user enter wrong ID',(done)=>{
      chai
          .request(app)
          .get('/api/GetOneComment/:id')
          
          .end((err,res)=>{
              res.should.have.status(401);
              res.body.should.be.a('object')
               
              
          })
          done()
  }),it('it should be able to fetch single comment',(done)=>{
    chai
        .request(app)
        .get('/api/GetOneComment/:id')
        
        .end((err,res)=>{
            res.should.have.status(401);
            res.body.should.be.a('object')
            
            
        })
        done()
}),
it.skip('it should be able to delete single comment if he/she is authenticated',(done)=>{
  chai
      .request(app)
      .get('/api/DeleteComment/:id')
      
      .end((err,res)=>{
          res.should.have.status(404);
          res.body.should.be.a('object')
          
          
      })
      done()
})

      })
    })

