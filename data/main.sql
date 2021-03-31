select *
from main;

# 10000 цифр вставим в таблицу
insert into numbers(num)
select 1000 * t4.n + 100 * t3.n + 10 * t1.n + t2.n as number
from (select 0 n
      union
      select 1
      union
      select 2
      union
      select 3
      union
      select 4
      union
      select 5
      union
      select 6
      union
      select 7
      union
      select 8
      union
      select 9) t1
        ,
     (select 0 n
      union
      select 1
      union
      select 2
      union
      select 3
      union
      select 4
      union
      select 5
      union
      select 6
      union
      select 7
      union
      select 8
      union
      select 9) t2
        ,
     (select 0 n
      union
      select 1
      union
      select 2
      union
      select 3
      union
      select 4
      union
      select 5
      union
      select 6
      union
      select 7
      union
      select 8
      union
      select 9) t3,
     (select 0 n
      union
      select 1
      union
      select 2
      union
      select 3
      union
      select 4
      union
      select 5
      union
      select 6
      union
      select 7
      union
      select 8
      union
      select 9) t4
order by number;

select *
from numbers;

# **********************************************
# распаковка main

truncate table main_docs;
insert into main_docs(num, doc_main)
select n.num,
       JSON_EXTRACT(m.main, concat('$[', n.num, ']')) doc_main
from main m,
     numbers n
# where JSON_EXTRACT(m.main, @P) is not null
;
delete
from main_docs
where doc_main is null;

select @P := concat('$[', num, ']')
from numbers;


# **********************************************
# распаковка children

truncate table child_docs;
insert into child_docs(num, doc_child)
select n.num,
       JSON_EXTRACT(m.child, concat('$[', n.num, ']')) doc_main
from main m,
     numbers n
# where JSON_EXTRACT(m.main, @P) is not null
;
delete
from child_docs
where doc_child is null;

# **********************************************
# нормальная таблица main
create table main_sql_fld
(
    id          int auto_increment primary key,
    New         varchar(7)     null,
    prodName    varchar(512)   null,
    prodDescr   text           null,
    prodPrice   decimal(15, 2) null,
    productImg  text           null,
    productUid  bigint         null,
    productUrl  varchar(2083)  null,
    prodSoldOut varchar(7)     null

);

insert into main_sql_fld(New, prodName, prodDescr, prodPrice, productImg, productUid, productUrl, prodSoldOut)

select doc_main ->> '$.New'         New,
       doc_main ->> '$.prodName'    prodName,
       doc_main ->> '$.prodDescr'   prodDescr,
       doc_main ->> '$.prodPrice'   prodPrice,
       doc_main ->> '$.productImg'  productImg,
       doc_main ->> '$.productUid'  productUid,
       doc_main ->> '$.productUrl'  productUrl,
       doc_main ->> '$.prodSoldOut' prodSoldOut


from main_docs;

# нормальная таблица child
create table child_sql_fld
(
    id              int auto_increment primary key,
    URL             varchar(2083) null,
    imgs            json          null,
    prodName        varchar(512)  null,
    prodDescription text          null
);

insert into child_sql_fld (URL, imgs, prodName, prodDescription)
select doc_child ->> '$.URL'             URL,
       doc_child ->> '$.imgs'            imgs,
       doc_child ->> '$.prodName'        prodName,
       doc_child ->> '$.prodDescription' prodDescription
from child_docs;


# insert into child_picts(_,URL_pict)

insert into child_picts(URL_pict, fk_child)
select imgs ->> '$[0]', id
from child_sql_fld
where imgs -> '$[0]' is not null;

insert into child_picts(URL_pict, fk_child)
select imgs ->> '$[1]', id
from child_sql_fld
where imgs -> '$[1]' is not null;

insert into child_picts(URL_pict, fk_child)
select imgs ->> '$[2]', id
from child_sql_fld
where imgs -> '$[2]' is not null;


# Сопоставим child с main
update main_sql_fld m
    inner join child_sql_fld c on m.productUrl = c.URL
set m.ref_child=c.id;

update main_sql_fld
set Newb = (New = 'true')
where true;

update main_sql_fld
set prodSoldOutb = (prodSoldOut = 'true')
where true;