# curl -o ./imgs/1.jpg https://static.tildacdn.com/tild3164-3361-4362-b364-336234643362/photo.jpg
select concat('curl -o ./main_imgs/', id, '.jpg ', productImg)
from main_sql_fld;


select concat('curl -o ./child_imgs/', fk_child,'--',id, '.jpg ', URL_pict)
from child_picts;

truncate table picts_url;
insert into picts_url(URL)
select URL_pict from child_picts;

insert into picts_url(URL)
select productImg  from main_sql_fld;

# удалить дубли
update picts_url p
inner join picts_url p2 on p.URL=p2.URL and p2.id < p.id
set p.dupl_id=p2.id
where true;

select * from picts_url p1 inner join picts_url p2
on p1.dupl_id=p2.id;