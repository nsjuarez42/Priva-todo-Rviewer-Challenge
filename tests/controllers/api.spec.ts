import request from 'supertest';
import 'mocha'
let chai = require('chai')
let expect = chai.expect
let chaiHttp=require('chai-http')
chai.use(chaiHttp)
let chaiaspromised =require('chai-as-promised')
chai.use(chaiaspromised)
import server from '../../src/server'
import app from '../../src/app';
import { Pong } from '../../src/domain/Pong';

describe('GET /ping', () => {
    it('should return 200 OK', () => {
        return request(app).get('/ping').expect(200)
    });

    it('should return `pong` in response', () => {
        return request(app).get('/ping').expect(new Pong().unmarshal())
    });
});

const TASK = "Take out thrash"
const TASK_NOT_FOUND = "Take out garbage"
const PATH = '/task'

describe('POST /task/:title',()=>{
    //201 created
    it('should return status code 201 and description of todo created',(done)=>{
        chai.request(server)
        .post(PATH + '/' + TASK)
        .end((err:any,res:any)=>{
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('string')
        })
        done()
    })
    //409 already exists
    it('should return status code 409 and description of todo already exists',(done)=>{
      chai.request(server)
      .post(PATH+'/'+ TASK)
      .end((err:any,res:any)=>{
        expect(res).to.have.status(409)
        expect(res.body).to.be.an("object")
      })
      done()
    })
    //400 invalid body provided
    it('should return status code of 400 and description of invalid body provided',(done)=>{
       chai.request(server)
       .post(PATH + '/')
       .end((err:any,res:any)=>{
        expect(res).to.have.status(400)
        expect(res.body).to.be.an("object")
       })
       done()
    })
    
})

describe('PATCH /task/:title',()=>{
 //200 created
 it('should return status code of 200 and description of todo created',(done)=>{
   chai.request(server)
   .patch(PATH + '/'+TASK)
   .end((err:any,res:any)=>{
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('string')
   })
   done()
 })
 //404 not found
 it('should return status code of 404 and description of todo not found',(done)=>{
   chai.request(server)
   .patch(PATH+'/'+TASK_NOT_FOUND)
   .end((err:any,res:any)=>{
    expect(res).to.have.status(404)
    expect(res.body).to.be.an('object')
   })
   done()
 })

 //400 invalid body provided
 it('should return status code of 400 with description of invalid body provided',(done)=>{
   chai.request(server)
   .patch(PATH + '/')
   .end((err:any,res:any)=>{
    expect(res).to.have.status(400)
    expect(res.body).to.be.an("object")
   })
   done()
 })
})

