# 10000 цифр вставим в таблицу
insert into numbers(num)
select 1000*t4.n+ 100*t3.n+ 10*t1.n + t2.n  as number
from
    (select 0 n union select 1 union select 2 union select 3 union select 4
     union select 5 union select 6 union select 7 union select 8 union select 9 ) t1
        ,
    (select 0 n union select 1 union select 2 union select 3 union select 4
     union select 5 union select 6 union select 7 union select 8 union select 9 ) t2
     ,
    (select 0 n union select 1 union select 2 union select 3 union select 4
     union select 5 union select 6 union select 7 union select 8 union select 9 ) t3,
    (select 0 n union select 1 union select 2 union select 3 union select 4
     union select 5 union select 6 union select 7 union select 8 union select 9 ) t4
order by number;

# **********************************************
# распаковка main

insert into main_docs(num, doc_main)
select
    n.num,
    JSON_EXTRACT(m.main, concat('$[', n.num , ']')) doc_main
from main m,
     numbers n
# where JSON_EXTRACT(m.main, @P) is not null
;
delete from  main_docs where doc_main is null;

select     @P := concat('$[', num , ']') from  numbers ;


# **********************************************
# распаковка children


insert into child_docs(num, doc_child)
select
    n.num,
    JSON_EXTRACT(m.child, concat('$[', n.num , ']')) doc_main
from main m,
     numbers n
# where JSON_EXTRACT(m.main, @P) is not null
;
delete from child_docs where doc_child is null ;


