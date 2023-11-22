DELETE FROM blogdb.posts WHERE postid;
INSERT INTO blogdb.posts(subject, content, username) VALUES ('how does code work?', 'hello', 'smithbeast2');
INSERT INTO blogdb.posts(subject, content, username) VALUES ('this is my post', 'stuff stuff stuff', 'secretman123');
INSERT INTO blogdb.posts(subject, content, username) VALUES ('crypto', 'crypto', 'cryptolover5');
DELETE FROM blogdb.users WHERE userid;
INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ('christophersmith', 'Christopher Smith', '2000-01-01', 'christophersmith@gmail.com', 'Chris Smith', 'csmith');
INSERT INTO blogdb.users(username, name, birthday, email, secretinfo, password) VALUES ('boatman', 'Boat Man', '2000-02-03', 'boatman@gmail.com', 'boatman', 'boatman1');
DELETE FROM adversary_database.stolen_info WHERE id;