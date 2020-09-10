import { describe } from 'mocha';
import { assert } from 'chai';
import { logic } from '../logic';
import { model } from '../model';

describe('用户模块', function() {
    describe.only(`用户登录${logic.user.findByUserName}`, function() {
        it('登陆失败', async function() {
            const data = { userName: 'ucapManager', passWord: '50e574365268f9ad3ab75f864c384678' };
            // const res = await model.user.findOne({userName:data.userName});
            const res = await logic.user.findByUserName(data.userName);
            res.should.have.length(1);
            // console.log("1" + res.passWord);
            // this test will be run
        });

        /*  it('should return the index when present', function() {
       // this test will also be run
     }); */
    });

    /* describe.only('#concat()', function() {
    it('should return a new Array', function() {
      // this test will also be run
    });
  });
 
  describe('#slice()', function() {
    it('should return a new Array', function() {
      // this test will not be run
    });
  }); */
});
