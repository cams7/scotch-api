'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var dataSource = app.dataSources.scotchDS;

  //create all models
  async.parallel({
      users: async.apply(createUsers),
      roles: async.apply(createRoles),
      acls: async.apply(createACLs)
  }, function(err, results1) {
      if (err) throw err;

      createAccessTokens(results1.users, function(err) {
        console.log('> AccessToken model created sucessfully');
      });

      createRoleMappings(results1.roles, function(err) {
        console.log('> RoleMapping model created sucessfully');
      });

      createComments(function(err) {
        console.log('> comment model created sucessfully');  
      }); 
  });

  //Create Users
  function createUsers(cb) {
      dataSource.automigrate('User', function(err) {
          if (err) return cb(err);

          console.log('-- user table created');

          var User = app.models.User;
          User.create([
              {
                  username: 'jose',
                  email: 'jose@ecommerce.test',
                  password: '12345'
              },
              {
                  username: 'maria',
                  email: 'maria@ecommerce.test',
                  password: '12345'
              },
              {
                  username: 'ana',
                  email: 'ana@ecommerce.test',
                  password: '12345'
              }
          ], cb);

          console.log('-- user table was populated');
      });
  }

  //Create Roles
  function createRoles(cb) {
      dataSource.automigrate('Role', function(err) {
          if (err) throw err;    

          console.log('-- role table created');

          var Role = app.models.Role;
          Role.create([], cb);
      });
  }

  //Create ACLs
  function createACLs(cb) {
      dataSource.automigrate('ACL', function(err) {
          if (err) throw err;    

          console.log('-- acl table created');  

          var ACL = app.models.ACL;
          ACL.create([], cb);                 
      });
  }

  //Create AccessTokens
  function createAccessTokens(users, cb) {
      dataSource.automigrate('AccessToken', function(err) {
          if (err) throw err;    

          console.log('-- accesstoken table created');   

          var AccessToken = app.models.AccessToken;
          AccessToken.create([], cb);
      });
  }

  //Create RoleMappings
  function createRoleMappings(roles, cb) {
      dataSource.automigrate('RoleMapping', function(err) {
          if (err) throw err;    

          console.log('-- rolemapping table created'); 

          var RoleMapping = app.models.RoleMapping;
          RoleMapping.create([], cb);           
      }); 
  }

  var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

   //Create comments
  function createComments(cb) {
      dataSource.automigrate('comment', function(err) {
          if (err) throw err;    

          console.log('-- comment table created');  

          var comment = app.models.comment;
          comment.create([
              {
                  author: 'José S. Silva',
                  text: 'Mensagem do José',
                  postDate: Date.now() - (DAY_IN_MILLISECONDS * 100)
              },
              {
                  author: 'Maria S. Alves',
                  text: 'Mensagem da Maria',
                  postDate: Date.now() - (DAY_IN_MILLISECONDS * 99)
              },
              {
                  author: 'Ana F. Gonçalves',
                  text: 'Mensagem da Ana',
                  postDate: Date.now() - (DAY_IN_MILLISECONDS * 98)
              }
          ], cb);       

          console.log('-- comment table was populated');           
      });
  }  
};
