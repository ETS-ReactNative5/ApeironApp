insert into authority (id, name) values ('1','ROLE_USER');
insert into authority (id, name) values ('2','ROLE_ADMIN');
insert into authority (id, name) values ('3','ROLE_DELIVERY');


insert into person_user values ('Admin','1', 'example@example.com',null,'$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Kompanija 1','0652610775','Stefan','Stefic',null);

insert into person_user  values ('RegisteredUser','2', 'example1@example.com',null,'$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Kompanija 1','0652610775','Nikola','Stefic',null);
insert into person_user  values ('RegisteredUser','3', 'example2@example.com',null,'$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Kompanija 1','0652610775','Petar','Djuric',null);


insert into user_authority (user_id, authority_id) values ('1', '2');
insert into user_authority (user_id, authority_id) values ('2', '1');
insert into user_authority (user_id, authority_id) values ('3', '1');


